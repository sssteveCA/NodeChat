import { Schemas } from "../../../namespaces/schemas";
import { Account, AccountInterface } from "../../database/models/account";
import { Token, TokenInterface } from "../../database/models/token";
import { MongoDbModelManagerInterface } from "../../database/mongodbmodelmanager";
import fs from "fs/promises";
import { Paths } from "../../../namespaces/paths";

export interface SetProfileImageFolderInterface{
    image_path: string;
    token_key: string;
}

/**
 * Move the uploaded profile image to the user profile image directory
 */
export class SetProfileImageFolder{
    private _image_path: string;
    private _token_key: string;
    private _errno:number = 0;
    private _error:string|null = null;

    constructor(data: SetProfileImageFolderInterface){
        this._image_path = data.image_path;
        this._token_key = data.token_key;
    }

    get image_path(){ return this._image_path; }
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
        let accountId: string|null = await this.getAccountId();
        if(accountId != null){
            let accountUsername: string|null = await this.getAccountUsername(accountId);
            if(accountUsername != null){
                let moved: boolean = await this.moveFile(this._image_path,accountUsername);
                if(moved) return true;
            }//if(accountUsername != null){
            else return false;
        }//if(accountId != null){
        return false;
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

    private async getAccountUsername(accountId: string): Promise<string|null>{
        let accountUsername: string|null = null;
        let mmiData: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string,
            schema: Schemas.ACCOUNTS
        };
        let accountData: AccountInterface = {id: accountId };
        let account: Account = new Account(mmiData,accountData);
        await account.getAccount({_id: accountId}).then(res => { accountUsername = account.username; });
        return accountUsername
    }

    /**
     * Move the uploaded file to the user profile image folder
     * @param src the uploaded file path
     * @param username the account username that has uploaded the image
     * @returns true if the move operation was successfully done, false otherwise
     */
    private async moveFile(src: string,username: string): Promise<boolean>{
        let response: boolean = false;
        let dest: string = `../../${Paths.STATIC_IMG_PROFILES}/${username}/profile.jpg`;
        await fs.rename(src,dest)
            .then(res => { response = true})
            .catch(err => { console.log(err); });
        return response;
    }
}