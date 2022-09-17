import { rejects } from "assert";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Constants } from "../../namespaces/constants";
import { Schemas } from "../../namespaces/schemas";
import { Account, AccountInterface } from "../database/models/account";
import { MongoDbModelManager, MongoDbModelManagerInterface } from "../database/mongodbmodelmanager";
import { EmailVerify, EmailVerifyInterface } from "../email/emailverify";
import { AccountNotFoundError } from "../errors/accountnotfounderror";
import { DuplicateKeysError } from "../errors/duplicatekeyserror";
import { MissingDataError } from "../errors/missingdataerror";
import { SendEmailError } from "../errors/sendemailerror";


export interface SubscribeInterface{
    username?: string;
    email?: string;
    password?: string;
    home_url?: string;
    activation_code?: string;
}

export class Subscribe{
    private _username:string;
    private _email:string;
    private _password:string;
    private _password_hash: string;
    private _home_url: string;
    private _activation_code: string;
    private _errno:number = 0;
    private _error:string|null = null;

    //Errors
    public static ERR_SUBSCRIBE:number = 1;
    public static ERR_ACTIVATION_NOTFOUND: number = 2;

    public static ERR_SUBSCRIBE_MSG:string = "Errore durante la registrazione";
    public static ERR_ACTIVATION_NOTFOUND_MSG: string = "Nessun account trovato con questo codice";

    constructor(data: SubscribeInterface){
        this.assignValues(data);
    }

    get username(){return this._username; }
    get email(){return this._email; }
    get password_hash(){return this._password_hash;}
    get home_url(){return this._home_url;}
    get activation_code(){return this._activation_code;}
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

    /**
     * Activate the account previously subscribed
     * @returns 
     */
    public async activateAccount(): Promise<object>{
        let response: object = {};
        try{
            if(!this._activation_code)throw new MissingDataError("Mancano uno o più dati richiesti");
            let mongodb_mmi: MongoDbModelManagerInterface = {
                collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string,
                schema: Schemas.ACCOUNTS
            };
            let acc_data: AccountInterface = {};
            let account: Account = new Account(mongodb_mmi,acc_data);
            await account.getAccount({activationCode: this._activation_code}).then(res => {
                if(res['done'] == true){
                    if(res['result'] != null){
                        //Found the account with this activation_code
                        return account.updateAccount(
                            {activationCode: this._activation_code},
                            {activationCode: null, verified: true});
                    }//if(res['result'] != null){
                    else throw new AccountNotFoundError("Codice non valido");
                }//if(res['done'] == true){
                else throw new Error("Errore durante l'attivazione dell'account");
            }).then(res => {
                if(res['done'] == true && res['result'].modifiedCount > 0){
                    response = {done: true,msg: "L'account è stato attivato", code: 200}
                }//if(res['done'] == true && res['result'].modifiedCount > 0){
                else throw new Error("Errore durante l'attivazione dell'account");
            }).catch(err => {
                throw err;
            });
        }catch(e: any){
            response['done'] = false
            if(e instanceof AccountNotFoundError){
                response['msg'] = e.message;
                response['code'] = 404;
            }
            else {
                response['msg'] = "Errore durante l'attivazione dell'account";
                response['code'] = 500;
            }
        }
        return response;
    }

    private assignValues(data: SubscribeInterface): void{
        if(data.username)this._username = data.username;
        if(data.email)this._email = data.email;
        if(data.password)this._password = data.password;
        if(data.home_url)this._home_url = data.home_url;
        if(data.activation_code)this._activation_code = data.activation_code;
    }

    /**
     * Generate an email verification code
     * @returns 
     */
    private emailVerifCode(): string{
        let emailCode: string = "";
        let now: number = Date.now();
        let characters: string = "aAbBcCdDeEfFGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
        let length: number = characters.length;
        let times:number = 80;
        for(let i = 0; i < times; i++){
            let random_character = Math.floor(Math.random()* length);
            emailCode += characters[random_character];
        }
        emailCode += now;
        this._activation_code = emailCode;
        return this._activation_code;
    }

    /**
     * Insert new User in accounts collections
     * @returns operation status info
     */
    public async insertNewAccount(): Promise<object>{
        let response: object = {};
        let account: Account;
        this._errno = 0;
        try{ 
            if(!this._username || !this._email)throw new MissingDataError("Mancano uno o più dati richiesti");
            let mongodb_mmi: MongoDbModelManagerInterface = {
                collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string, schema: Schemas.ACCOUNTS
            }; 
            await this.passwordHashPromise().then(hash => {
                let emailCode: string = this.emailVerifCode();
                let account_data: AccountInterface= {
                    username: this._username, email: this._email,password_hash: hash, activationCode: emailCode
                };
                account = new Account(mongodb_mmi,account_data);
                return account.insertAccount();
            }).then(res => {
                if(res['errno'] == 0){
                    //User added in DB
                    let ev_data: EmailVerifyInterface = {
                        username: account.username, email: account.email, email_verify_url: this._home_url,
                        activation_code: account.activationCode
                    }
                    console.log("ev_data => ");
                    console.log(ev_data);
                    let ev: EmailVerify = new EmailVerify(ev_data);
                    return ev.sendEmailVerify();
                }//if(res['errno'] == 0){
                else{
                    if(res['errno'] == Account.DUPLICATEKEYS_ERROR)
                        throw new DuplicateKeysError(Account.DUPLICATEKEYS_ERROR_MSG);
                    else
                      throw new Error(Subscribe.ERR_SUBSCRIBE_MSG);
                }//else of if(res['errno'] == 0){
            }).then(res => {
                if(res['done'] == true){
                    //Verification email sent
                    response = {
                        done: true, msg: "Per completare la registrazione, verifica l'account nella tua casella di posta",
                        code: 201
                    };
                }//if(res['errno'] == 0){
                else
                    throw new SendEmailError(EmailVerify.ERR_SENDMAIL_MSG);
            }).catch(err => {
                throw err;
            });
        }catch(e: any){
            this._errno = Subscribe.ERR_SUBSCRIBE;
            response['done'] = false; 
            if(e instanceof MissingDataError || e instanceof DuplicateKeysError){
                response['msg'] = e.message as string;
                response['code'] = 400;
            }    
            else{
                response['msg'] = this.error;
                response['code'] = 500;
            }   
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