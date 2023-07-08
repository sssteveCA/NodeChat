
export interface AddUserVideoInterface{
    filename: string;
    video_path: string;
    token_key: string;
}

export class AddUserVideo{
    private _filename: string;
    private _video_path: string;
    private _token_key: string;
    private _errno:number = 0;
    private _error:string|null = null;

    public static ERR_ACCOUNT_ID:number = 1;
    public static ERR_ACCOUNT_USERNAME:number = 2;
    public static ERR_MOVE_FILE:number = 3;
    public static ERR_FILE_EXISTS:number = 4;
    public static ERR_ADD_VIDEO:number = 5;

    private static ERR_ACCOUNT_ID_MSG:string = "L'id dell'account non è stato trovato";
    private static ERR_ACCOUNT_USERNAME_MSG:string = "Lo username dell'account non è stato trovato";
    private static ERR_MOVE_FILE_MSG:string = "Impossibile spostare il video";
    private static ERR_FILE_EXISTS_MSG: string = "Hai già un video con questo nome";
    private static ERR_ADD_VIDEO_MSG:string = "Errore durante l'aggiornamento del database";

    constructor(data: AddUserVideoInterface){
        this._filename = data.filename;
        this._video_path = data.video_path;
        this._token_key = data.token_key;
    }

    get filename(){ return this._filename; }
    get video_path(){ return this._video_path; }
    get token_key(){ return this._token_key; }
    get errno(){ return this._errno; }
    get error(){
        switch(this._errno){
            case AddUserVideo.ERR_ACCOUNT_ID:
                this._error = AddUserVideo.ERR_ACCOUNT_ID_MSG;
                break;
            case AddUserVideo.ERR_ACCOUNT_USERNAME:
                this._error = AddUserVideo.ERR_ACCOUNT_USERNAME_MSG;
                break;
            case AddUserVideo.ERR_MOVE_FILE:
                this._error = AddUserVideo.ERR_MOVE_FILE_MSG;
                break;
            case AddUserVideo.ERR_FILE_EXISTS:
                this._error = AddUserVideo.ERR_FILE_EXISTS_MSG;
                break;
            case AddUserVideo.ERR_ADD_VIDEO:
                this._error = AddUserVideo.ERR_ADD_VIDEO_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }
}