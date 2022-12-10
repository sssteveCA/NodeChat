
export interface ProfileImageUploadInterface{
    token_key: string;
}

/**
 * User profile image upload request
 */
export class ProfileImageUpload{
    private _token_key: string;
    private _errno:number = 0;
    private _error:string|null = null;

    public static ERR_IMAGE_UPLOAD:number = 1;

    private static ERR_IMAGE_UPLOAD_MSG:string = "Errore durante il caricamento dell'immagine del profilo";

    private static FETCH_URL: string = "api/profile/upload_profile_image";

    constructor(data: ProfileImageUploadInterface){
        this._token_key = data.token_key;
    }

    get errno(){return this._errno; }
    get error(){
        switch(this._errno){
            case ProfileImageUpload.ERR_IMAGE_UPLOAD:
                this._error = ProfileImageUpload.ERR_IMAGE_UPLOAD_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }
}