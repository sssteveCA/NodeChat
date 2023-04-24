
import { Constants } from "../../namespaces/constants";

export interface AddPhotoRequestInterface{
    photo: File;
    token_key: string;
}

export class AddPhotoRequest{

    private _token_key: string;
    private _photo: File;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_FETCH:number = 1;
    private static ERR_FETCH_MSG: string = "Errore durante il caricamento della foto";

    private static FETCH_URL:string = "/api/profile/add/photo";

    constructor(data: AddPhotoRequestInterface){
        this._token_key = data.token_key;
        this._photo = data.photo;
    }

    get photo(){ return this._photo; }
    get errno(){ return this._errno; }
    get error(){ 
        switch(this._errno){
            case AddPhotoRequest.ERR_FETCH:
                this._error = AddPhotoRequest.ERR_FETCH_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    public async addPhoto(): Promise<object>{
        let response: object = {}
        this._errno = 0;
        try{
            await this.addPhotoPromise().then(res => {
                response = JSON.parse(res);
            }).catch(err => {
                throw err;
            });
        }catch(e){
            this._errno = AddPhotoRequest.ERR_FETCH;
            response = {
                done: false, message: this.error
            }
        }
        return response;
    }

    private async addPhotoPromise(): Promise<string>{
        let fd: FormData = new FormData();
        fd.append('photo', this._photo);
        return await new Promise<string>((resolve,reject)=>{
            fetch(AddPhotoRequest.FETCH_URL,{
                headers: {
                    'NodeChatAuth': this._token_key
                },
                method: 'POST',
                body: fd
            }).then(res => {
                resolve(res.text());
            }).catch(err => {
                reject(err);
            });
        });
    }


}