import { Schemas } from "../../../namespaces/schemas";
import { Token, TokenInterface } from "../../database/models/token";
import { MongoDbModelManagerInterface } from "../../database/mongodbmodelmanager";

export interface SetProfileImageFolderInterface{
    image_dir: string;
    token_key: string;
}

/**
 * Move the uploaded profile image to the user profile image directory
 */
export class SetProfileImageFolder{
    private _image_dir: string;
    private _token_key: string;
    private _errno:number = 0;
    private _error:string|null = null;

    constructor(data: SetProfileImageFolderInterface){
        this._image_dir = data.image_dir;
        this._token_key = data.token_key;
    }

    get image_dir(){ return this._image_dir; }
    get token_key(){ return this._token_key; }
    get errno(){ return this._errno; }
    get error(){
        switch(this._errno){
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    public async setFolder(): Promise<boolean>{
        let response: boolean = false;
        let mmiData: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_TOKENS_COLLECTION as string,
            schema: Schemas.TOKENS
        }
        let tokenData: TokenInterface = {
            tokenKey: this._token_key
        };
        let token: Token = new Token(mmiData,tokenData);
        await token.getToken({tokenKey: token.tokenKey}).then(res =>{

        })
        return response;
    }

    private async getAccountId(): Promise<string|null>{
        let accountId: string|null = null;
        let mmiData: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_TOKENS_COLLECTION as string,
            schema: Schemas.TOKENS
        }
        let tokenData: TokenInterface = {
            tokenKey: this._token_key
        };
        let token: Token = new Token(mmiData,tokenData);
        await token.getToken({tokenKey: token.tokenKey}).then(res =>{ accountId = token.accountId;  });
        return accountId;
    }
}