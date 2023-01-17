export interface SetEducationInterface{
    token_key: string;
    secondary_school: string;
    university: string;
}

export class SetEducation{
    private _token_key: string;
    private _secondary_school: string;
    private _university: string;
    private _errno: number = 0;
    private _error: string|null = null;

    private static ERR_ACCOUNT_ID:number = 1;
    private static ERR_UPDATE:number = 2;

    private static ERR_ACCOUNT_ID_MSG:string = "L'id dell'account non è stato trovato";
    private static ERR_UPDATE_MSG:string = "Errore durante l'aggiornamento delle informazioni sull'istruzione";

    constructor(data: SetEducationInterface){

    }

    get secondary_school(){return this._secondary_school;}
    get university(){return this._university;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case SetEducation.ERR_ACCOUNT_ID:
                this._error = SetEducation.ERR_ACCOUNT_ID_MSG;
                break;
            case SetEducation.ERR_UPDATE:
                this._error = SetEducation.ERR_UPDATE_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }
}