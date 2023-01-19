export interface SetEmploymentInterface{
    token_key: string;
    employment: string;
}

export class SetEmployment{
    private _token_key: string;
    private _employment: string;
    private _errno: number = 0;
    private _error: string|null = null;

    private static ERR_ACCOUNT_ID:number = 1;
    private static ERR_UPDATE:number = 2;

    private static ERR_ACCOUNT_ID_MSG:string = "L'id dell'account non è stato trovato";
    private static ERR_UPDATE_MSG:string = "Errore durante l'aggiornamento delle informazioni sul lavoro";

    constructor(data: SetEmploymentInterface){
        this._token_key = data.token_key;
        this._employment = data.employment;
    }

    get token_key(){return this._token_key;}
    get employment(){return this._employment;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case SetEmployment.ERR_ACCOUNT_ID:
                this._error = SetEmployment.ERR_ACCOUNT_ID_MSG;
                break;
            case SetEmployment.ERR_UPDATE:
                this._error = SetEmployment.ERR_UPDATE_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }
}