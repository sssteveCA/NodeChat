
export interface DeleteAccountRequestInterface{
    token_key: string;
    password: string;
    conf_password: string;
}

export class DeleteAccountRequest{
    private _token_key: string;
    private _password: string;
    private _conf_password: string;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_FETCH:number = 1;

    private static ERR_FETCH_MSG:string = "Errore durante la rimozione del tuo account";

    private static FETCH_URL:string = "/api/profile/delete_account";

    constructor(data: DeleteAccountRequestInterface){
        this._token_key = data.token_key;
        this._password = data.password;
        this._conf_password = data.conf_password;
    }

    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case DeleteAccountRequest.ERR_FETCH:
                this._error = DeleteAccountRequest.ERR_FETCH_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    public async deleteAccount(): Promise<object>{
        let response: object = {};
        this._errno = 0;
        try{
            await this.deleteAccountPromise().then(res => {
                console.log(res);
                response = JSON.parse(res);
            }).catch(err => {
                throw err;
            })
        }catch(e){
            this._errno = DeleteAccountRequest.ERR_FETCH;
            response = {done: false, message: this.error }
        }
        return response;
    }

    private async deleteAccountPromise(): Promise<string>{
        let body: object = {
            token_key: this._token_key, password: this._password, conf_password: this._conf_password
        };
        return await new Promise<string>((resolve,reject)=>{
            fetch(DeleteAccountRequest.FETCH_URL,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(res => {
                resolve(res.text());
            }).catch(err => {
                reject(err);
            });
        });
    }
}