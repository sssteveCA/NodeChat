
export interface EducationUpdateRequestInterface{
    token_key: string;
    secondary_school: string;
    university: string;
}

export class EducationUpdateRequest{
    private _token_key: string;
    private _secondary_school: string;
    private _university: string;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_FETCH:number = 1;

    private static ERR_FETCH_MSG:string = "Errore durante l'esecuzione della richiesta";

    private static FETCH_URL:string = "/";

    constructor(data: EducationUpdateRequestInterface){

    }

    get secondary_school(){return this._secondary_school;}
    get university(){return this._university;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case EducationUpdateRequest.ERR_FETCH:
                this._error = EducationUpdateRequest.ERR_FETCH_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }


}