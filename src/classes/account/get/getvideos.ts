
export interface GetVideosInterface{
    token_key: string;
}

export class GetVideos{
    private _token_key: string;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_ACCOUNT_ID:number = 1;
    public static ERR_GET_PHOTOS:number = 2;

    private static ERR_ACCOUNT_ID_MSG:string = "L'id dell'account non è stato trovato";
    private static ERR_GET_PHOTOS_MSG:string = "Errore durante la lettura delle immagini";

    constructor(data: GetVideosInterface){
        this._token_key = data.token_key;
    }

    get errno(){ return this._errno; }
    get error(){
        switch(this._errno){
            case GetVideos.ERR_ACCOUNT_ID:
                this._error = GetVideos.ERR_ACCOUNT_ID_MSG;
                break;
            case GetVideos.ERR_GET_PHOTOS:
                this._error = GetVideos.ERR_GET_PHOTOS_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }
}