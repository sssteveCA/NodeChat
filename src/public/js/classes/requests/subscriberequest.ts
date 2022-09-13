
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

    get username(){return this._username; }
    get email(){return this._email; }
    get password(){return this._password; }
    get confPass(){return this._confPass; }
    get errno(){return this._errno; }
    get error(){
        switch(this._errno){
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    
}