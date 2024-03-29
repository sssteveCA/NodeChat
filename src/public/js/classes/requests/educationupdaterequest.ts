
export interface EducationUpdateRequestInterface{
    token_key: string;
    secondary_school: string;
    university: string;
}

export class EducationUpdateRequest{
    private _token_key: string;
    private _secondary_school: string;
    private _university: string;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_FETCH:number = 1;

    private static ERR_FETCH_MSG:string = "Errore durante l'esecuzione della richiesta";

    private static FETCH_URL:string = "/api/profile/update/education";

    constructor(data: EducationUpdateRequestInterface){
        this._token_key = data.token_key;
        this._secondary_school = data.secondary_school;
        this._university = data.university;
    }

    get secondary_school(){return this._secondary_school;}
    get university(){return this._university;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case EducationUpdateRequest.ERR_FETCH:
                this._error = EducationUpdateRequest.ERR_FETCH_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    public async edUpdate(): Promise<object>{
        let response: object = {};
        this._errno = 0;
        try{
            await this.edUpdatePromise().then(res => {
                response = JSON.parse(res);
            }).catch(err => {
                console.warn(err);
                throw err;
            })
        }catch(e){
            this._errno = EducationUpdateRequest.ERR_FETCH;
            response = {done: false, message: this.error}
        }
        return response;
    }

    private async edUpdatePromise(): Promise<string>{
        let body: object = {
            secondary_school: this._secondary_school, university: this._university
        }
        return await new Promise<string>((resolve,reject)=> {
            fetch(EducationUpdateRequest.FETCH_URL,{
                method: 'PUT',
                headers: {
                    "Accept": "application/json", "Content-Type": "application/json",
                    'NodeChatAuth': this._token_key
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