export interface EmploymentUpdateRequestInterface{
    token_key: string;
    employment: string;
}

export class EmploymentUpdateRequest{
    private _token_key: string;
    private _employment;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_FETCH:number = 1;

    private static ERR_FETCH_MSG:string = "Errore durante l'esecuzione della richiesta";

    private static FETCH_URL:string =  "/api/profile/update/employment";

    constructor(data: EmploymentUpdateRequestInterface){
        this._token_key = data.token_key;
        this._employment = data.employment;
    }

    get token_key(){return this._token_key;}
    get employment(){return this._employment;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case EmploymentUpdateRequest.ERR_FETCH:
                this._error = EmploymentUpdateRequest.ERR_FETCH_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    public async employmentUpdate(): Promise<object>{
        let response: object =  {};
        this._errno = 0;
        try{
            await this.employmentUpdatePromise().then(res => {
                //console.log(res);
                response = JSON.parse(res);
            }).catch(err => {
                console.warn(err);
                throw err;
            });
        }catch(e){
            this._errno = EmploymentUpdateRequest.ERR_FETCH;
            response = {
                done: false, message: this.error
            }
        }
        return response;
    }

    private async employmentUpdatePromise(): Promise<string>{
        return await new Promise<string>((resolve,reject) => {
            fetch(EmploymentUpdateRequest.FETCH_URL, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json", "Content-Type": "application/json",
                    'NodeChatAuth': this._token_key
                },
                body: JSON.stringify({
                    employment: this._employment
                })
            }).then(res => {
                    resolve(res.text());
            }).catch(err => {
                reject(err);
            });
        });
    }

}