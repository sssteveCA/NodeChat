
export interface AddPhotoRequestInterface{
    photo: File;
}

export class AddPhotoRequest{

    private _photo: File;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_FETCH:number = 1;
    private static ERR_FETCH_MSG: string = "Errore durante il caricamento della foto";

    private static FETCH_URL:string = "/";

    constructor(data: AddPhotoRequestInterface){

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
                console.log(res);
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