
export interface LoginInterface{
    accountId: string;
}

export class Login{

    private _accountId: string;
    private _token_key: string;
    private _errno: number = 0;
    private _error: string|null = null;

    private static TOKENKEY_LENGTH:number = 100;

    constructor(data: LoginInterface){
        this.assignValues(data);
    }

    get accountId(){return this._accountId;}
    get token_key(){return this._accountId;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    /**
     * Login with user account, set the session data and the token key 
     * @returns operation status info
     */
    public async login(): Promise<object>{
        let response: object = {};
        try{

        }catch(e){

        }
        return response;
    }

    private assignValues(data: LoginInterface): void{
        this._accountId = data.accountId;
    }

    /**
     * Generate a token key string
     * @returns the token key string generated
     */
    private tokenKeyString(): string{
        let tokenKey: string = "";
        let now: number = Date.now();
        let characters: string = "aAbBcCdDeEfFGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
        let length: number = characters.length;
        let times:number = Login.TOKENKEY_LENGTH;
        for(let i = 0; i < times; i++){
            let random_character = Math.floor(Math.random()* length);
            tokenKey += characters[random_character];
        }
        tokenKey = now.toString().concat(tokenKey);
        return tokenKey;
    }

}