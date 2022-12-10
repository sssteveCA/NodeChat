
export interface ProfileImageUploadInterface{
    token_key: string;
    image: File;
}

/**
 * User profile image upload request
 */
export class ProfileImageUpload{
    private _token_key: string;
    private _image: File;
    private _errno:number = 0;
    private _error:string|null = null;

    public static ERR_IMAGE_UPLOAD:number = 1;

    private static ERR_IMAGE_UPLOAD_MSG:string = "Errore durante il caricamento dell'immagine del profilo";

    private static FETCH_URL: string = "api/profile/upload_profile_image";

    constructor(data: ProfileImageUploadInterface){
        this._token_key = data.token_key;
    }

    get image(){return this._image;}
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

    public async uploadImage(): Promise<object>{
        this._errno = 0;
        let response: object = {};
        try{
            await this.uploadImagePromise().then(res => {

            }).catch(err => {
                console.warn(err);
                throw err;
            });
        }catch(e){
            this._errno = ProfileImageUpload.ERR_IMAGE_UPLOAD;
            response = {
                done: false, msg: this.error
            };
        }
        return response;
    }

    private async uploadImagePromise(): Promise<string>{
        return await new Promise<string>((resolve,reject)=>{
            let url: string = ProfileImageUpload.FETCH_URL;
            let formData = new FormData();
            formData.append('tokenKey',this._token_key);
            formData.append('image',this._image);
            fetch(url,{
                method: 'POST', body: formData
            }).then(res => {
                resolve(res.text());
            }).catch(err => {
                reject(err);
            })
        });
    }
}