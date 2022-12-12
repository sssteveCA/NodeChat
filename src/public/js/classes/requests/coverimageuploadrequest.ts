
export interface CoverImageUploadRequestInterface{
    token_key: string;
    image: File;
}

export class CoverImageUploadRequest{
    private _token_key: string;
    private _image: File;
    private _errno:number = 0;
    private _error:string|null = null;

    public static ERR_IMAGE_UPLOAD:number = 1;

    private static ERR_IMAGE_UPLOAD_MSG:string = "Errore durante il caricamento dell'immagine di copertina";

    constructor(data: CoverImageUploadRequestInterface){
        this._token_key = data.token_key;
        this._image = data.image;
    }

    get image(){return this._image;}
    get errno(){return this._errno; }
    get error(){
        switch(this._errno){
            case CoverImageUploadRequest.ERR_IMAGE_UPLOAD:
                this._error = CoverImageUploadRequest.ERR_IMAGE_UPLOAD_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }
}