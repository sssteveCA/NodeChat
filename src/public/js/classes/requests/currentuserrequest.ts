
export interface CurrentUserRequestInterface{
    token_key: string;
}

export class CurrentUserRequest{
    private _token_key: string;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_FETCH:number = 1;

    private static ERR_FETCH_MSG:string = "Errore durante l'esecuzione della richiesta";

    private static FETCH_URL:string = "/api/current_user";

    constructor(data: CurrentUserRequestInterface){
        this._token_key = data.token_key;
    }

    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case CurrentUserRequest.ERR_FETCH:
                this._error = CurrentUserRequest.ERR_FETCH_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    public async currentUser(): Promise<object>{
        this._errno = 0;
        let response: object = {};
        try{
            await this.currentUserPromise().then(res => {
                //console.log(res);
                response = JSON.parse(res);
            }).catch(err => {
                throw err;
            });
        }catch(e){
            this._errno = CurrentUserRequest.ERR_FETCH;
            response = { done: false, msg: this.error }
        }
        return response;
    }

    private async currentUserPromise(): Promise<string>{
        return await new Promise<string>((resolve, reject) => {
            fetch(CurrentUserRequest.FETCH_URL,{
                method: "POST",
                headers: {
                    "Accept": "application/json", "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token_key: this._token_key
                })
            }).then(res => {
                resolve(res.text());
            }).catch(err => {
                reject(err);
            });
        });
    }


}