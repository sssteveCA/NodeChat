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

    private static ERR_ACCOUNT_ID:number = 1;
    private static ERR_ACCOUNT_USERNAME:number = 2;
    private static ERR_MOVE_FILE:number = 3;
    private static ERR_UPDATE_PROPERTY:number = 4;

    private static ERR_ACCOUNT_ID_MSG:string = "L'id dell'account non è stato trovato";
    private static ERR_ACCOUNT_USERNAME_MSG:string = "Lo username dell'account non è stato trovato";
    private static ERR_MOVE_FILE_MSG:string = "Impossibile spostare l'immagine";
    private static ERR_UPDATE_PROPERTY_MSG:string = "Errore durante l'aggiornamento del database";

    constructor(data: SetProfileImageFolderInterface){
        this._image_path = data.image_path;
        this._token_key = data.token_key;
    }

    get image_path(){ return this._image_path; }
    get token_key(){ return this._token_key; }
    get errno(){ return this._errno; }
    get error(){
        switch(this._errno){
            case SetProfileImageFolder.ERR_ACCOUNT_ID:
                this._error = SetProfileImageFolder.ERR_ACCOUNT_ID_MSG;
                break;
            case SetProfileImageFolder.ERR_ACCOUNT_USERNAME:
                this._error = SetProfileImageFolder.ERR_ACCOUNT_USERNAME_MSG;
                break;
            case SetProfileImageFolder.ERR_MOVE_FILE:
                this._error = SetProfileImageFolder.ERR_MOVE_FILE_MSG;
                break;
            case SetProfileImageFolder.ERR_UPDATE_PROPERTY:
                this._error = SetProfileImageFolder.ERR_UPDATE_PROPERTY_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    /**
     * Set the path of the new uploaded image
     * @param protocol the current server protocol
     * @param host the current server host
     * @returns 
     */
    public async setFolder(protocol: string, host: string): Promise<object>{
        this._errno = 0;
        let response: object = {dest: null, done: false};
        let accountId: string|null = await this.getAccountId();
        //console.log("SetProfileImageFolder accountId => "+accountId);
        if(accountId != null){
            let accountUsername: string|null = await this.getAccountUsername(accountId);
            //console.log("SetProfileImageFolder accountUsername => "+accountUsername);
            if(accountUsername != null){
                let moved: object = await this.moveFile(this._image_path,accountUsername);
                //console.log("SetProfileImageFolder moved => ");
                //console.log(moved);
                if(moved["done"] == true){
                    let baseUrl: string = `${protocol}://${host}`;
                    let updateProperty: object = await this.updateProfileImageProperty(baseUrl, moved["dest"],accountUsername);
                    if(updateProperty["done"] == true)
                        response = {dest: updateProperty["absUrl"], done: true};  
                }  
                else this._errno = SetProfileImageFolder.ERR_MOVE_FILE;
            }//if(accountUsername != null){
            else 
                this._errno = SetProfileImageFolder.ERR_ACCOUNT_USERNAME; 
        }//if(accountId != null){
        else 
            this._errno = SetProfileImageFolder.ERR_ACCOUNT_ID; 
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
        /* console.log ("GetAccountId tokenData => ");
        console.log(tokenData); */
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
    private async moveFile(src: string,username: string): Promise<object>{
        let response: object = { dest: null, done: false };
        let destDir: string = `${Paths.ROOTPATH}public${Paths.STATIC_IMG_PROFILES}/${username}`;
        let dest: string = `${destDir}/profile.jpg`;
        await fs.mkdir(destDir,{ recursive: true}).then(res => {
            return fs.rename(src,dest);
        }).then(res => {
            response = {dest: dest, done: true};
        }).catch(err => {
            response["done"] = false;
            console.log(err); 
        });
        return response;
    }

    /**
     * Update the user profile image property in database
     * @param baseUrl the baseUrl of the current server
     * @param dest the filesystem path of the user profile image
     * @param username the unique username property of the document to update
     * @returns an object that contains the url of the uploaded profile image, or false if error
     */
    private async updateProfileImageProperty(baseUrl: string, dest: string, username: string): Promise<object>{
        let response = { absUrl: "", done: false };
        const imgIndex: number = dest.indexOf("/img/profiles/");
        const absoluteUrl: string = baseUrl+dest.substring(imgIndex);
        //console.log("absUrl => "+absoluteUrl);
        let mmiData: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string,
            schema: Schemas.ACCOUNTS
        };
        let accountData: AccountInterface = { username: username };
        let account: Account = new Account(mmiData,accountData);
        await account.updateAccount({username: account.username},{"images.profileImage": absoluteUrl}).then(res => {
            /* console.log("profile image update => ");
            console.log(res); */
            if(res["done"] == true) response = {absUrl: absoluteUrl, done: true};
        });
        return response;
    }
}