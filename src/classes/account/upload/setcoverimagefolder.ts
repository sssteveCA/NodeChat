import { Schemas } from "../../../namespaces/schemas";
import { Account, AccountInterface } from "../../database/models/account";
import { Token, TokenInterface } from "../../database/models/token";
import { MongoDbModelManagerInterface } from "../../database/mongodbmodelmanager";

export interface SetCoverImageFolderInterface{
    image_path: string;
    token_key: string;
}

/**
 * Move the uploaded cover image to the user cover image directory
 */
export class SetCoverImageFolder{
    private _image_path: string;
    private _token_key: string;
    private _errno:number = 0;
    private _error:string|null = null;

    private static ERR_ACCOUNT_ID:number = 1;
    private static ERR_ACCOUNT_USERNAME:number = 2;
    private static ERR_MOVE_FILE:number = 3;
    private static ERR_UPDATE_PROPERTY:number = 4;

    private static ERR_ACCOUNT_ID_MSG:string = "L'id dell'account non è stato trovato";
    private static ERR_ACCOUNT_USERNAME_MSG:string = "Lo username dell'account non è stato trovato";
    private static ERR_MOVE_FILE_MSG:string = "Impossibile spostare l'immagine";
    private static ERR_UPDATE_PROPERTY_MSG:string = "Errore durante l'aggiornamento del database";

    constructor(data: SetCoverImageFolderInterface){
        this._image_path = data.image_path;
        this._token_key = data.token_key;
    }

    get image_path(){ return this._image_path; }
    get token_key(){ return this._token_key; }
    get errno(){ return this._errno; }
    get error(){
        switch(this._errno){
            case SetCoverImageFolder.ERR_ACCOUNT_ID:
                this._error = SetCoverImageFolder.ERR_ACCOUNT_ID_MSG;
                break;
            case SetCoverImageFolder.ERR_ACCOUNT_USERNAME:
                this._error = SetCoverImageFolder.ERR_ACCOUNT_USERNAME_MSG;
                break;
            case SetCoverImageFolder.ERR_MOVE_FILE:
                this._error = SetCoverImageFolder.ERR_MOVE_FILE_MSG;
                break;
            case SetCoverImageFolder.ERR_UPDATE_PROPERTY:
                this._error = SetCoverImageFolder.ERR_UPDATE_PROPERTY_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
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
        /* console.log ("GetAccountId tokenData => ");
        console.log(tokenData); */
        let token: Token = new Token(mmiData,tokenData);
        await token.getToken({tokenKey: token.tokenKey}).then(res => { accountId = token.accountId; });
        return accountId;
    }

    private async getAccountUsername(accountId: string): Promise<string|null>{
        let accountUsername: string|null = null;
        let mmiData: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string,
            schema: Schemas.ACCOUNTS
        };
        let accountData: AccountInterface = {id: accountId };
        let account: Account = new Account(mmiData,accountData);
        await account.getAccount({_id: accountId}).then(res => { accountUsername = account.username; });
        return accountUsername;
    }
}