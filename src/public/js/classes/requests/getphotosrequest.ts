
export interface GetPhotosRequestInterface{
    token_key: string;
}

export class GetPhotosRequest{
    private _token_key: string;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_FETCH:number = 1;

    private static ERR_FETCH_MSG:string = "Errore durante l'esecuzione della richiesta";

    private static FETCH_URL:string = "/api/profile/get/photos";

    constructor(data: GetPhotosRequestInterface){
        this._token_key = data.token_key;
    }

    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case GetPhotosRequest.ERR_FETCH:
                this._error = GetPhotosRequest.ERR_FETCH_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    public async gpRequest(): Promise<object>{
        let response: object = {};
        try{
            await this.gpRequestPromise().then(res => {
                response = JSON.parse(res);
            }).catch(err => {
                console.warn(err);
                throw err;
            })
        }catch(e){
            response = { done: false, message: "Errore durante il caricamento delle tue foto" }
        }
        return response;
    }

    private async gpRequestPromise(): Promise<string>{
        return await new Promise<string>((resolve,reject)=>{
            fetch(GetPhotosRequest.FETCH_URL,{
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    'NodeChatAuth': this._token_key
                },
            }).then(res => {
                resolve(res.text());
            }).catch(err => {
                reject(err);
            })
        });
    }

}