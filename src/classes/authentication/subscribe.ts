
export interface SubscribeInterface{
    username: string;
    email: string;
    password: string;
}

export class Subscribe{
    private _username:string;
    private _email:string;
    private _password:string;
    private _errno:number = 0;
    private _error:string|null = null;

    constructor(data: SubscribeInterface){
        
    }

    get username(){return this._username; }
    get email(){return this._email; }
    get password(){return this._password; }
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