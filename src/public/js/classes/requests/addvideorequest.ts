
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

    public async addVideo(): Promise<object>{
        let response: object = {}
        this._errno = 0;
        try{
            await this.addVideoPromise().then(res => {
                response = JSON.parse(res);
            }).catch(err => {
                throw err;
            })
        }catch(e){
            this._errno = AddVideoRequest.ERR_FETCH;
            response = {
                done: false, message: this.error
            }
        }
        return response;
    }

    private async addVideoPromise(): Promise<string>{
        let fd: FormData = new FormData();
        fd.append('video',this._video);
        return await new Promise<string>((resolve, reject)=>{
            fetch(AddVideoRequest.FETCH_URL,{
                headers: {
                    'NodeChatAuth': this._token_key
                },
                method: 'POST',
                body: fd
            }).then(res => resolve(res.text()))
            .catch(err => reject(err))
        })
        
    }
}