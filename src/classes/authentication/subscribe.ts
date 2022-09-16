import { rejects } from "assert";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Constants } from "../../namespaces/constants";
import { Schemas } from "../../namespaces/schemas";
import { Account, AccountInterface } from "../database/models/account";
import { MongoDbModelManager, MongoDbModelManagerInterface } from "../database/mongodbmodelmanager";
import { EmailVerify, EmailVerifyInterface } from "../email/emailverify";
import { MissingDataError } from "../errors/missingdataerror";


export interface SubscribeInterface{
    username: string;
    email: string;
    password: string;
}

export class Subscribe{
    private _username:string;
    private _email:string;
    private _password:string;
    private _password_hash: string;
    private _errno:number = 0;
    private _error:string|null = null;

    //Errors
    public static ERR_SUBSCRIBE:number = 1;

    private static ERR_SUBSCRIBE_MSG:string = "Errore durante la registrazione";

    constructor(data: SubscribeInterface){
        this.assignValues(data);
    }

    get username(){return this._username; }
    get email(){return this._email; }
    get password_hash(){return this._password_hash;}
    get errno(){return this._errno; }
    get error(){
        switch(this._errno){
            case Subscribe.ERR_SUBSCRIBE:
                this._error = Subscribe.ERR_SUBSCRIBE_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    private assignValues(data: SubscribeInterface): void{
        this._username = data.username;
        this._email = data.email;
        this._password = data.password;
    }

    /**
     * Generate an email verification code
     * @returns 
     */
    private emailVerifCode(): string{
        let emailCode: string = "";
        let now: number = Date.now();
        let characters: string = "aAbBcCdDeEfFGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
        let times:number = 80;
        for(let i = 0; i < 80; i++){
            let random_character = Math.floor(Math.random()* times);
            emailCode += characters[random_character];
        }
        emailCode += now;
        return emailCode;
    }

    public async insertNewAccount(): Promise<object>{
        let response: object = {};
        let account: Account;
        this._errno = 0;
        try{ 
            if(!this._username || !this._email)throw new MissingDataError("Mancano uno o più dati richiesti");
            let mongodb_mmi: MongoDbModelManagerInterface = {
                model_name: Constants.MONGODB_ACCOUNTS_COLLECTION,
                schema: Schemas.ACCOUNTS
            }; 
            await this.passwordHashPromise().then(hash => {
                let emailCode: string = this.emailVerifCode();
                let account_data: AccountInterface= {
                    username: this._username,
                    email: this._email,
                    password_hash: hash,
                    activationCode: emailCode
                };
                account = new Account(mongodb_mmi,account_data);
                return account.insertAccount();
            }).then(res => {
                //User added in DB
                let ev_data: EmailVerifyInterface = {
                    username: account.username,
                    email: account.email,
                    email_verify_url: '',
                    activation_code: account.activationCode
                }
                let ev: EmailVerify = new EmailVerify(ev_data);
            }).then(res => {
                if(res['errno'] == 0){
                    response = {
                        done: true,
                        msg: "Per completare la registrazione, verifica l'account nella tua casella di posta",
                        code: 201
                    };
                }//if(res['errno'] == 0){
                else{
                    response['done'] = false;
                    if(res['errno'] == Account.DUPLICATEKEYS_ERROR){
                        response['msg'] = account.error;
                        response['code'] = 400;
                    }          
                    else{
                        response['msg'] = Subscribe.ERR_SUBSCRIBE_MSG;
                        response['code'] = 500;
                    }        
                }//else di if(res['errno'] == 0){
            }).catch(err => {
                throw(err);
            });
        }catch(e){
            this._errno = Subscribe.ERR_SUBSCRIBE;
            response = {
                done: false,
                msg: Subscribe.ERR_SUBSCRIBE_MSG
            };
        }
        return response;
    }

    /**
     * Hash the input password with bcrypt algorithm
     * @returns the password hashed
     */
    private async passwordHashPromise(): Promise<string>{
        const saltRounds: number = 10;
        return await new Promise<string>((resolve,reject)=>{
            if(!this._password){
                let mde: MissingDataError =  new MissingDataError("Mancano uno o più dati richiesti");
                reject(mde);
            }
            bcrypt.genSalt(saltRounds).then(salt => {
                return bcrypt.hash(this._password, salt);
            }).then(hash => {
                resolve(hash);
            }).catch(err => {
                reject(err);
            });
        });
    }


}