import { Constants } from "../../namespaces/constants";

export interface SubscribeRequestInterface{
    name: string, surname: string, username:string;
    email:string; password:string; confPass:string;
}

export class SubscribeRequest{
    private _name: string;
    private _surname: string;
    private _username:string;
    private _email:string;
    private _password:string;
    private _confPass:string;
    private _errno:number = 0;
    private _error:string|null = null;

    private static FETCH_URL: string = "/newAccount";

    //Errors
    public static ERR_SUBSCRIBE:number = 1;

    private static ERR_SUBSCRIBE_MSG:string = "Errore durante la registrazione";

    constructor(data: SubscribeRequestInterface){
        this._name = data.name;
        this._surname = data.surname;
        this._username = data.username;
        this._email = data.email;
        this._password = data.password;
        this._confPass = data.confPass;
    }

    get name(){return this._name;}
    get surname(){return this._surname}
    get username(){return this._username; }
    get email(){return this._email; }
    get password(){return this._password; }
    get confPass(){return this._confPass; }
    get errno(){return this._errno; }
    get error(){
        switch(this._errno){
            case SubscribeRequest.ERR_SUBSCRIBE:
                this._error = SubscribeRequest.ERR_SUBSCRIBE_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    /**
     * Execute the request to create new account
     * @returns Promise
     */
    public async subscribe(): Promise<object>{
        let response: object = {};
        this._errno = 0;
        try{
            await this.subscribePromise().then(res => {
                let obj = JSON.parse(res);
                response = {
                    done: obj[Constants.KEY_DONE],
                    message: obj[Constants.KEY_MESSAGE]
                };
            }).catch(err => {
                console.warn(err);
                throw err;
            });
        }catch(e){
            this._errno = SubscribeRequest.ERR_SUBSCRIBE;
            response = {
                done: false,
                message: this.error
            };
        }
        return response;
    }

    private async subscribePromise(): Promise<string>{
        return await new Promise<string>((resolve, reject) => {
            let post_data: SubscribeRequestInterface = {
                name: this._name,surname: this._surname,
                username: this._username,email: this._email,password: this._password,
                confPass: this._confPass
            }
            fetch(SubscribeRequest.FETCH_URL,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post_data)
            }).then(res => {
                resolve(res.text());
            }).catch(err => {
                reject(err);
            });
        });
    }

}