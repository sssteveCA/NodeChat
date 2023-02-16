import { trusted } from "mongoose";
import { Schemas } from "../../namespaces/schemas";
import { Token, TokenInterface } from "../database/models/token";
import { MongoDbModelManagerInterface } from "../database/mongodbmodelmanager";

export interface LoginInterface{
    accountId: string;
}

export class Login{

    private _accountId: string;
    private _token_key: string;
    private _errno: number = 0;
    private _error: string|null = null;

    public static LOGIN_ERROR: number = 1;

    private static LOGIN_ERROR_MSG: string = "Errore durante il login";

    private static TOKENKEY_LENGTH:number = 100;

    constructor(data: LoginInterface){
        this.assignValues(data);
    }

    get accountId(){return this._accountId;}
    get token_key(){return this._accountId;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case Login.LOGIN_ERROR:
                this._error = Login.LOGIN_ERROR_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    /**
     * Login with user account, set the session data and the token key 
     * @returns operation status info
     */
    public async login(): Promise<object>{
        let response: object = {};
        try{
            this._token_key = this.tokenKeyString();
            let mongo_mmi: MongoDbModelManagerInterface = {
                collection_name: process.env.MONGODB_TOKENS_COLLECTION as string, schema: Schemas.TOKENS
            };
            let token_data: TokenInterface = {
                accountId: this._accountId, tokenKey: this._token_key
            };
            let token: Token = new Token(mongo_mmi,token_data);
            await token.insertToken().then(res => {
                if(res['errno'] == 0)response = { done: true, token_key: this._token_key };
                else{
                    this._errno = Login.LOGIN_ERROR;
                    throw new Error(this.error as string);
                }
            }).catch(err => {
                /* console.log("login.ts login insertToken error => ");
                console.log(err); */
                throw err;
            });
        }catch(e){
            response = { done: false,message: this.error, code: 500};
        }
        return response;
    }

    private assignValues(data: LoginInterface): void{
        this._accountId = data.accountId;
    }

    /**
     * Generate a token key string
     * @returns the token key string generated
     */
    private tokenKeyString(): string{
        let tokenKey: string = "";
        let now: number = Date.now();
        let characters: string = "aAbBcCdDeEfFGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
        let length: number = characters.length;
        let times:number = Login.TOKENKEY_LENGTH;
        for(let i = 0; i < times; i++){
            let random_character = Math.floor(Math.random()* length);
            tokenKey += characters[random_character];
        }
        tokenKey = now.toString().concat(tokenKey);
        return tokenKey;
    }

}