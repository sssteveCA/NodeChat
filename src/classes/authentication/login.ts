
export interface LoginInterface{
    accountId: string;
}

export class Login{

    private _accountId: string;
    private _errno: number = 0;
    private _error: string|null = null;

    constructor(data: LoginInterface){
        this.assignValues(data);
    }

    get accountId(){return this._accountId;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    private assignValues(data: LoginInterface): void{
        this._accountId = data.accountId;
    }

}