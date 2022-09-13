import { ValidationError } from "../../errors/validationerror.js";

export interface SubscribeRequestInterface{
    username:string;
    email:string;
    password:string;
    confPass:string;
}

export class SubscribeRequest{
    private _username:string;
    private _email:string;
    private _password:string;
    private _confPass:string;
    private _errno:number = 0;
    private _error:string|null = null;

    constructor(data: SubscribeRequestInterface){
        this._username = data.username;
        this._email = data.email;
        this._password = data.password;
        this._confPass = data.confPass;
    }

    private static regex_list = {
        email: "^[a-z][a-z_\d]{2,30}@([a-z]{3,30}\.){1,10}[a-z]{2,8}$"
    };

    //Errors
    public static INVALID_DATA:number = 1;

    private static INVALID_DATA_MSG:string = "I dati inseriti non sono validi";

    get username(){return this._username; }
    get email(){return this._email; }
    get password(){return this._password; }
    get confPass(){return this._confPass; }
    get errno(){return this._errno; }
    get error(){
        switch(this._errno){
            case SubscribeRequest.INVALID_DATA:
                this._error = SubscribeRequest.INVALID_DATA_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

}