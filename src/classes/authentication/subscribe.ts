import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Constants } from "../../namespaces/constants";
import { Schemas } from "../../namespaces/schemas";
import { MongoDbModelManager, MongoDbModelManagerInterface } from "../database/mongodbmodelmanager";


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

    constructor(data: SubscribeInterface){
        this.assignValues(data);
    }

    get username(){return this._username; }
    get email(){return this._email; }
    get password_hash(){return this._password_hash;}
    get errno(){return this._errno; }
    get error(){
        switch(this._errno){
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
        let mongodb_mmi: MongoDbModelManagerInterface = {
            model_name: Constants.MONGODB_ACCOUNTS_COLLECTION,
            schema: Schemas.ACCOUNTS
        };
        return response;
    }

    /**
     * Hash the input password with bcrypt algorithm
     * @returns the password hashed
     */
    private async passwordHashPromise(): Promise<string>{
        const saltRounds: number = 10;
        return await new Promise<string>((resolve,reject)=>{
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