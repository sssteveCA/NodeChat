
export interface LoginRequestInterface{
    username: string;
    password: string;
}

export class LoginRequest{
    private _username: string;
    private _password: string; 
    private _errno:number = 0;
    private _error:string|null = null;

    constructor(data: LoginRequestInterface){
        this._username = data.username;
        this._password = data.password;
    }

    get username(){return this._username;}
    get password(){return this._password;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            default:
                this._error = null;
                break;
        }
        return this._errno;
    }
}