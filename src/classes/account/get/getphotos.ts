import { General } from "../../general";

export interface GetPhotosInterface{
    token_key: string;
}

export class GetPhotos{

    private _token_key: string;
    private _errno: number = 0;
    private _error: string|null = null;

    private static ERR_ACCOUNT_ID:number = 1;

    private static ERR_ACCOUNT_ID_MSG:string = "L'id dell'account non è stato trovato";

    constructor(data: GetPhotosInterface){
        this._token_key = data.token_key;
    }

    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case GetPhotos.ERR_ACCOUNT_ID:
                this._error = GetPhotos.ERR_ACCOUNT_ID_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    /**
     * Get the photos uploaded by the logged user
     * @returns 
     */
    public async getPhotos(): Promise<object>{
        this._errno = 0;
        let accountId: string|null = await General.getAccountId(this._token_key);
        if(accountId != null){

        }//if(accountId != null){
        this._errno = GetPhotos.ERR_ACCOUNT_ID;
        return {done: false}

    }
}