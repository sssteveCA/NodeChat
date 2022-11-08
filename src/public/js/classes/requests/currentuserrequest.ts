
export interface CurrentUserRequestInterface{
    token_key: string;
}

export class CurrentUserRequest{
    private _token_key: string;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_FETCH:number = 1;

    private static ERR_FETCH_MSG:string = "Errore durante l'esecuzione della richiesta";

    constructor(data: CurrentUserRequestInterface){
        this._token_key = data.token_key;
    }

    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case CurrentUserRequest.ERR_FETCH:
                this._error = CurrentUserRequest.ERR_FETCH_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }


}