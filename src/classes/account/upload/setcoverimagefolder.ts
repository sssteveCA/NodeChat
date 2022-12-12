
export interface SetCoverImageFolderInterface{
    image_path: string;
    token_key: string;
}

/**
 * Move the uploaded cover image to the user cover image directory
 */
export class SetCoverImageFolder{
    private _image_path: string;
    private _token_key: string;
    private _errno:number = 0;
    private _error:string|null = null;

    private static ERR_ACCOUNT_ID:number = 1;
    private static ERR_ACCOUNT_USERNAME:number = 2;
    private static ERR_MOVE_FILE:number = 3;
    private static ERR_UPDATE_PROPERTY:number = 4;

    private static ERR_ACCOUNT_ID_MSG:string = "L'id dell'account non è stato trovato";
    private static ERR_ACCOUNT_USERNAME_MSG:string = "Lo username dell'account non è stato trovato";
    private static ERR_MOVE_FILE_MSG:string = "Impossibile spostare l'immagine";
    private static ERR_UPDATE_PROPERTY_MSG:string = "Errore durante l'aggiornamento del database";

    constructor(data: SetCoverImageFolderInterface){
        this._image_path = data.image_path;
        this._token_key = data.token_key;
    }

    get image_path(){ return this._image_path; }
    get token_key(){ return this._token_key; }
    get errno(){ return this._errno; }
    get error(){
        switch(this._errno){
            case SetCoverImageFolder.ERR_ACCOUNT_ID:
                this._error = SetCoverImageFolder.ERR_ACCOUNT_ID_MSG;
                break;
            case SetCoverImageFolder.ERR_ACCOUNT_USERNAME:
                this._error = SetCoverImageFolder.ERR_ACCOUNT_USERNAME_MSG;
                break;
            case SetCoverImageFolder.ERR_MOVE_FILE:
                this._error = SetCoverImageFolder.ERR_MOVE_FILE_MSG;
                break;
            case SetCoverImageFolder.ERR_UPDATE_PROPERTY:
                this._error = SetCoverImageFolder.ERR_UPDATE_PROPERTY_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }
}