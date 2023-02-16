
import { General } from '../../general';

export interface DeleteAccountInterface{
    token_key: string;
    password: string;
}

export class DeleteAccount{
    private _token_key: string;
    private _password: string;
    private _errno: number = 0;
    private _error: string|null = null;

    constructor(data: DeleteAccountInterface){
        this._token_key = data.token_key;
        this._password = data.password;
    }

    get errno(){return this._errno;}
    get error(){return this._error;}

    public async deleteAccount(): Promise<object>{
        let response: object = {};
        this._errno = 0;
        await General.getAccountId(this._token_key).then(accountId => {
            
        })
        return response;
    }

    
}