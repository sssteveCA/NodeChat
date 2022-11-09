

export interface UserRequestInterface{
    user_id: string;
}

/**
 * Get the needed logged user information for profile managing
 */
export class UserRequest{
    private _user_id: string;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_FETCH:number = 1;

    private static ERR_FETCH_MSG:string = "Errore durante l'esecuzione della richiesta";

    private static FETCH_URL:string = "/api/user_info";

    constructor(data: UserRequestInterface){
        this._user_id = data.user_id;
    }

    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case UserRequest.ERR_FETCH:
                this._error = UserRequest.ERR_FETCH_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    public async userInfo(): Promise<object>{
        this._errno = 0;
        let response: object = {};
        try{
            await this.userInfoPromise().then(res => {
                //console.log(res);
                response = JSON.parse(res);
            }).catch(err => {
                throw err;
            });
        }catch(e){
            this._errno = UserRequest.ERR_FETCH;
            response = { done: false, msg: this.error }
        }
        return response;
    }

    private async userInfoPromise(): Promise<string>{
        return await new Promise<string>((resolve, reject) => {
            fetch(UserRequest.FETCH_URL,{
                method: "POST",
                headers: {
                    "Accept": "application/json", "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: this._user_id
                })
            }).then(res => {
                resolve(res.text());
            }).catch(err => {
                reject(err);
            });
        });
    }


}