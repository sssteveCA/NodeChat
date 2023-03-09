import { Paths } from "../../../namespaces/paths";
import { Schemas } from "../../../namespaces/schemas";
import { Account } from "../../database/models/account";
import { MongoDbModelManagerInterface } from "../../database/mongodbmodelmanager";
import fs from "fs/promises";
import fsapi from "fs";
import { Constants } from "../../../namespaces/constants";
import { Photo, PhotoInterface } from "../../database/models/photo";
import { General } from "../../general";
import { FileAlreadyExistsError } from "../../errors/filealreadyexistserror";

export interface AddUserPhotoInterface{
    filename: string;
    photo_path: string;
    token_key: string;
}

export class AddUserPhoto{

    private _filename: string;
    private _photo_path: string;
    private _token_key: string;
    private _errno:number = 0;
    private _error:string|null = null;

    public static ERR_ACCOUNT_ID:number = 1;
    public static ERR_ACCOUNT_USERNAME:number = 2;
    public static ERR_MOVE_FILE:number = 3;
    public static ERR_FILE_EXISTS:number = 4;
    public static ERR_ADD_PHOTO:number = 5;

    private static ERR_ACCOUNT_ID_MSG:string = "L'id dell'account non è stato trovato";
    private static ERR_ACCOUNT_USERNAME_MSG:string = "Lo username dell'account non è stato trovato";
    private static ERR_MOVE_FILE_MSG:string = "Impossibile spostare l'immagine";
    private static ERR_FILE_EXISTS_MSG: string = "Hai già una foto con questo nome";
    private static ERR_ADD_PHOTO_MSG:string = "Errore durante l'aggiornamento del database";

    constructor(data: AddUserPhotoInterface){
        this._filename = data.filename;
        this._photo_path = data.photo_path;
        this._token_key = data.token_key;
    }

    get filename(){ return this._filename; }
    get photo_path(){ return this._photo_path; }
    get token_key(){ return this._token_key; }
    get errno(){ return this._errno; }
    get error(){
        switch(this._errno){
            case AddUserPhoto.ERR_ACCOUNT_ID:
                this._error = AddUserPhoto.ERR_ACCOUNT_ID_MSG;
                break;
            case AddUserPhoto.ERR_ACCOUNT_USERNAME:
                this._error = AddUserPhoto.ERR_ACCOUNT_USERNAME_MSG;
                break;
            case AddUserPhoto.ERR_MOVE_FILE:
                this._error = AddUserPhoto.ERR_MOVE_FILE_MSG;
                break;
            case AddUserPhoto.ERR_FILE_EXISTS:
                this._error = AddUserPhoto.ERR_FILE_EXISTS_MSG;
                break;
            case AddUserPhoto.ERR_ADD_PHOTO:
                this._error = AddUserPhoto.ERR_ADD_PHOTO_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    /**
     * Add the photo to the user photos list
     */
    public async addPhoto(): Promise<object>{
        this._errno = 0;
        let response: object = {dest: null, done: false}
        let accountId: string|null = await General.getAccountId(this._token_key);
        if(accountId != null){
            let accountUsername: string|null = await this.getAccountUsername(accountId);
            if(accountUsername != null){
                let moved: object = await this.moveFile(this._photo_path,accountUsername);
                if(moved[Constants.KEY_DONE] == true){
                    let addPhoto: object = await this.addPhotoDocument(accountId, moved["dest"],accountUsername);
                    if(addPhoto[Constants.KEY_DONE] == true){
                        response = {
                            dest: addPhoto["absUrl"],
                            done: true
                        }
                    }//if(addPhoto[Constants.KEY_DONE] == true){
                    else 
                        this._errno = AddUserPhoto.ERR_ADD_PHOTO;
                }//if(moved[Constants.KEY_DONE] == true){
                else{
                    if(moved['exists']) this._errno = AddUserPhoto.ERR_FILE_EXISTS;
                    else this._errno = AddUserPhoto.ERR_MOVE_FILE;
                }
            }//if(accountUsername != null){
        }//if(accountId != null){
        else
            this._errno = AddUserPhoto.ERR_ACCOUNT_ID;
        return response;
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
     * @param username the account username that has uploaded the photo
     * @returns true if the move operation was successfully done, false otherwise
     */
    private async moveFile(src: string, username: string): Promise<object>{
        let response: object = {dest: null, done: false, exists: false}
        let destDir: string = `${Paths.ROOTPATH}public${Paths.STATIC_IMG_PHOTOS}/${username}`;
        console.log("AddUserPhoto moveFile destDir => "+destDir);
        let dest: string = `${destDir}/${this._filename}`;
        console.log("AddUserPhoto moveFile dest => "+dest);
        await fs.mkdir(destDir,{ recursive: true}).then(res => {
            console.log("fs mkdir OK");
            fsapi.access(dest,(notexists)=>{
                console.log("fsapi access OK");
                if(notexists) return true;
                else throw new FileAlreadyExistsError("");
            });
        }).then(res => {
            console.log("before fs.rename");
            return fs.rename(src,dest);
        }).then(res => {
            response = {dest: dest, done: true};
        }).catch(err => {
            if(err instanceof FileAlreadyExistsError)
                response['exists'] = true;
            response[Constants.KEY_DONE] = false;
        })
        return response;
    }

    /**
     * Add a new document to photos collection
     * @param dest the filesystem path of the uploaded photo
     * @returns an object that contains the url of the uploaded profile image, or false if error
     */
    private async addPhotoDocument(accountId: string, dest: string, username: string): Promise<object>{
        let response = {absUrl:  "", done: false}
        const imgIndex: number = dest.indexOf(`/img/photos/`);
        const absoluteUrl: string = dest.substring(imgIndex);
        let mmiData: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_PHOTOS_COLLECTION as string,
            schema: Schemas.PHOTOS
        }
        let photoData: PhotoInterface = { accountId: accountId, path: absoluteUrl }
        console.log("AddUserPhoto addPhotoDocument photoData");
        console.log(photoData);
        let photo: Photo = new Photo(mmiData,photoData);
        await photo.insertPhoto().then(res => {
            if(res[Constants.KEY_DONE] == true)
                response = {absUrl: absoluteUrl, done: true}
        })
        return response;
        
    }
}