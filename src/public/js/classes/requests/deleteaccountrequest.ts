
export interface DeleteAccountRequestInterface{
    token_key: string;
    password: string;
    conf_password: string;
}

export class DeleteAccountRequest{
    private _token_key: string;
    private _password: string;
    private _conf_password: string;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_FETCH:number = 1;

    private static ERR_FETCH_MSG:string = "Errore durante l'esecuzione della richiesta";

    private static FETCH_URL:string = "/api/profile/delete_account";

    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case DeleteAccountRequest.ERR_FETCH:
                this._error = DeleteAccountRequest.ERR_FETCH_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }
}