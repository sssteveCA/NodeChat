
export interface AddVideoRequestInterface{
    video: File;
    token_key: string;
}

export class AddVideoRequest{
    private _token_key: string;
    private _video: File;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_FETCH:number = 1;
    private static ERR_FETCH_MSG: string = "Errore durante il caricamento del video";

    private static FETCH_URL:string = "/api/profile/add/video";

    constructor(data: AddVideoRequestInterface){
        this._token_key = data.token_key;
        this._video = data.video;
    }

    get video(){ return this._video; }
    get errno(){ return this._errno; }
    get error(){ 
        switch(this._errno){
            case AddVideoRequest.ERR_FETCH:
                this._error = AddVideoRequest.ERR_FETCH_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }
}