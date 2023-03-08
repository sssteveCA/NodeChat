import { Paths } from "../../../namespaces/paths";
import { Schemas } from "../../../namespaces/schemas";
import { Account } from "../../database/models/account";
import { MongoDbModelManagerInterface } from "../../database/mongodbmodelmanager";
import fs from "fs/promises";
import { Constants } from "../../../namespaces/constants";


export interface SetPhotoFolderInterface{
    photo_path: string;
    token_key: string;
}

export class SetPhotoFolder{

    private _photo_path: string;
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

    constructor(data: SetPhotoFolderInterface){
        this._photo_path = data.photo_path;
        this._token_key = data.token_key;
    }

    get photo_path(){ return this._photo_path; }
    get token_key(){ return this._token_key; }
    get errno(){ return this._errno; }
    get error(){
        switch(this._errno){
            case SetPhotoFolder.ERR_ACCOUNT_ID:
                this._error = SetPhotoFolder.ERR_ACCOUNT_ID_MSG;
                break;
            case SetPhotoFolder.ERR_ACCOUNT_USERNAME:
                this._error = SetPhotoFolder.ERR_ACCOUNT_USERNAME_MSG;
                break;
            case SetPhotoFolder.ERR_MOVE_FILE:
                this._error = SetPhotoFolder.ERR_MOVE_FILE_MSG;
                break;
            case SetPhotoFolder.ERR_UPDATE_PROPERTY:
                this._error = SetPhotoFolder.ERR_UPDATE_PROPERTY_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    private async getAccountUsername(accountId: string): Promise<string|null>{
        let accountUsername: string|null = null;
        let mmiData: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string,
            schema: Schemas.ACCOUNTS
        }
        let account: Account = new Account(mmiData,{});
        await account.getAccount({_id: accountId}).then(res => accountUsername = account.username );
        return accountUsername;
    }

    /**
     * Move the uploaded file to the user photos list folder
     * @param src the uploaded file path
     * @param username the account username that has uploaded the image
     * @returns true if the move operation was successfully done, false otherwise
     */
    private async moveFile(src: string, username: string): Promise<object>{
        let response: object = {dest: null, done: false}
        let destDir: string = `${Paths.ROOTPATH}public${Paths.STATIC_IMG_PHOTOS}/${username}`;
        let dest: string = `${destDir}`;
        await fs.mkdir(destDir,{ recursive: true}).then(res => {
            return fs.access(dest);
        }).then(res => {
            return fs.rename(src,dest);
        }).then(res => {
            response = {dest: dest, done: true};
        }).catch(err => {
            response[Constants.KEY_DONE] = false;
        })
        return response;
    }
}