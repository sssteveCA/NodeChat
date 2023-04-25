
import { Constants } from '../../../namespaces/constants';
import { Schemas } from '../../../namespaces/schemas';
import { Account } from '../../database/models/account';
import { MongoDbModelManagerInterface } from '../../database/mongodbmodelmanager';
import { General } from '../../general';
import bcrypt from 'bcrypt';
import { InvalidCredentialsError } from '../../errors/invalidcredentialserror';
import { AccountNotFoundError } from '../../errors/accountnotfounderror';
import { Messages } from '../../../namespaces/messages';
import { MongoDbModelsManagerInterface } from '../../database/mongodbmodelsmanager';
import { Tokens } from '../../database/models/tokens';
import { Photos } from '../../database/models/photos';
import fs from 'fs/promises';
import { Paths } from '../../../namespaces/paths';
import FileDeletingError from '../../errors/filedeletingerror';

export interface DeleteAccountInterface{
    token_key: string;
    password: string;
}

export class DeleteAccount{
    private _token_key: string;
    private _password: string;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_ACCOUNT_NOT_FOUND: number = 1;
    public static ERR_INVALID_CREDENTIALS: number = 2;
    public static ERR_ACCOUNT_DELETE: number = 3;

    public static ERR_ACCOUNT_NOT_FOUND_MSG: string = "Nessun account trovato con il token fornito";
    public static ERR_INVALID_CREDENTIALS_MSG: string = "La password che hai inserito non è corretta";
    public static ERR_ACCOUNT_DELETE_MSG: string = "Errore durante la rimozione del tuo account";

    constructor(data: DeleteAccountInterface){
        this._token_key = data.token_key;
        this._password = data.password;
    }

    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case DeleteAccount.ERR_ACCOUNT_NOT_FOUND:
                this._error = DeleteAccount.ERR_ACCOUNT_NOT_FOUND_MSG;
                break;
            case DeleteAccount.ERR_INVALID_CREDENTIALS:
                this._error = DeleteAccount.ERR_INVALID_CREDENTIALS_MSG;
                break;
            case DeleteAccount.ERR_ACCOUNT_DELETE:
                this._error = DeleteAccount.ERR_ACCOUNT_DELETE_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    /**
     * 
     * @returns Execute all the operations to delete the selected user account
     */
    public async deleteAccount(): Promise<object>{
        let response: object = {};
        this._errno = 0;
        let user_data: object = {}
        await General.getAccountId(this._token_key).then(accountId => {
            if(accountId != null)
                return General.getAccountById(accountId as string);
            else throw new AccountNotFoundError("");
        }).then(user => {
            user_data = user;
            return this.checkPassword(user_data);
        })
        .then(cp_response => {
            if(cp_response['authorized'] == true){
                return this.deletePhotoFiles(user_data);
            }
            else throw new InvalidCredentialsError("")
        })
        .then(dp_response => {
            if(dp_response[Constants.KEY_DONE]){
                return this.deleteRelatedPhotos(user_data);
            }
            else throw new FileDeletingError("")
        }).then(photos_deleted => {
            if(photos_deleted[Constants.KEY_DONE]){
                return this.deleteRelatedTokens(user_data);
            }
            else throw new Error("");
        }).then(tokens_deleted => {
            if(tokens_deleted[Constants.KEY_DONE]){
                return this.deleteAccountOp(tokens_deleted['accountId']);
            }
            else throw new Error("")
        }).then(account_delete => {
            response = {done: true, message: "Il tuo account è stato rimosso con successo", code: 200}
        }).catch(err => {
            console.warn(err);
            if(err instanceof AccountNotFoundError){
                this._errno = DeleteAccount.ERR_ACCOUNT_NOT_FOUND;
                response = {done: false, message: Messages.ERROR_ACCOUNT_DELETE, code: 404}
            }
            else if(err instanceof InvalidCredentialsError){
                this._errno = DeleteAccount.ERR_INVALID_CREDENTIALS;
                response = {done: false, message: this.error, code: 401}
            }
            else{
                this._errno = DeleteAccount.ERR_ACCOUNT_DELETE;
                response = {done: false, message: Messages.ERROR_ACCOUNT_DELETE, code: 500}
            }
        });
        return response;
    }

    /**
     * Check if user has provided the correct password before delete
     * @param user the account with the password to compare
     * @returns an object with the check password status and the account id if the password is correct
     */
    private async checkPassword(user: object): Promise<object>{
        let cp_response: object = {};
        await bcrypt.compare(this._password,user['password']).then(isAuthorized =>{ 
            if(isAuthorized)
                cp_response = { authorized: true}
            else
                cp_response = { authorized: false }
        }).catch(err => {
            cp_response = { authorized: false }
        })
        return cp_response;
    }

    /**
     * Delete the account with a specific id permanently
     * @param user the account to the delete
     * @returns true if the account was deleted, false otherwise
     */
    private async deleteAccountOp(user: object): Promise<object>{
        let mmiData: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string,
            schema: Schemas.ACCOUNTS
        }
        let account: Account = new Account(mmiData,{});
        const delete_response = await account.deleteAccount({_id: user['_id']});
        return {
            done: delete_response[Constants.KEY_DONE]
        } 
    }

    /**
     * Delete the photo files associated to the deleting account
     * @param user the account of the user to the delete
     * @returns 
     */
    private async deletePhotoFiles(user: object): Promise<object>{
        let dp_response: object = {}
        await fs.rm(`${Paths.STATIC_IMG_PHOTOS}/${user['username']}`,{recursive: true, force: true}).then(res => {
            dp_response = { done: true }
        })
        .catch(err => {
            dp_response = { done: false }
        })
        return dp_response;
    }

    /**
     * Remove the photos related to the account to delete
     * @param user the account to delete
     * @returns 
     */
    private async deleteRelatedPhotos(user: object): Promise<object>{
        let mmisData: MongoDbModelsManagerInterface = {
            collection_name: process.env.MONGODB_PHOTOS_COLLECTION as string,
            schema: Schemas.PHOTOS
        }
        let photos: Photos = new Photos(mmisData,{});
        const delete_photos = await photos.deletePhotos({accountId: user['_id']});
        if(delete_photos[Constants.KEY_DONE])
            return {done: true}
        return {done: false}
    }

    /**
     * Remove the tokens related to the account to delete
     * @param user the user to remove
     * @returns 
     */
    private async deleteRelatedTokens(user: object): Promise<object>{
        let mmisData: MongoDbModelsManagerInterface = {
            collection_name: process.env.MONGODB_TOKENS_COLLECTION as string,
            schema: Schemas.TOKENS
        }
        let tokens: Tokens = new Tokens(mmisData,{});
        const delete_tokens = await tokens.deleteTokens({accountId: user['_id']});
        if(delete_tokens[Constants.KEY_DONE])
            return {done: true}
        return {done: false}
    }
    
}