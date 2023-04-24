
export interface CoverImageUploadRequestInterface{
    token_key: string;
    image: File;
}

/**
 * User cover image upload request
 */
export class CoverImageUploadRequest{
    private _token_key: string;
    private _image: File;
    private _errno:number = 0;
    private _error:string|null = null;

    public static ERR_IMAGE_UPLOAD:number = 1;

    private static ERR_IMAGE_UPLOAD_MSG:string = "Errore durante il caricamento dell'immagine di copertina";

    private static FETCH_URL: string = "/api/profile/add/cover_image";

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

    public async uploadImage(): Promise<object>{
        this._errno = 0;
        let response: object = {};
        try{
            await this.uploadImagePromise().then(res => {
                response = JSON.parse(res);
            }).catch(err => {
                throw err;
            });
        }catch(e){
            this._errno = CoverImageUploadRequest.ERR_IMAGE_UPLOAD;
            response = {
                done: false, message: this.error
            };
        }
        return response;
    }

    private async uploadImagePromise(): Promise<string>{
        return await new Promise<string>((resolve, reject)=>{
            let url: string = CoverImageUploadRequest.FETCH_URL;
            let formData = new FormData();
            formData.append('image',this._image);
            fetch(url, {
                method: 'POST', body: formData,
                headers: {
                    'NodeChatAuth': this._token_key
                }
            }).then(res => {
                resolve(res.text());
            }).catch(err => {
                reject(err);
            });
        });
    }
}