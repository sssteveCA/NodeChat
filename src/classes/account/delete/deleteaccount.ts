
export interface DeleteAccountInterface{
    token_key: string;
    password: string;
}

export class DeleteAccount{
    private _token_key: string;
    private _password: string;

    constructor(data: DeleteAccountInterface){
        this._token_key = data.token_key;
        this._password = data.password;
    }

    
}