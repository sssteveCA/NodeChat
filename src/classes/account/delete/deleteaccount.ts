
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
        await General.getAccountId(this._token_key).then(accountId => {
            if(accountId != null) return this.checkPassword(accountId);
            else throw new AccountNotFoundError("");
        }).then(cp_response => {
            if(cp_response['authorized'] == true){
                return this.deleteRelatedPhotos(cp_response['accountId']);
            }
            else throw new InvalidCredentialsError("")
        }).then(photos_deleted => {
            if(photos_deleted[Constants.KEY_DONE]){
                return this.deleteRelatedTokens(photos_deleted['accountId']);
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
     * @param accountId the id of the account with the password to compare
     * @returns an object with the check password status and the account id if the password is correct
     */
    private async checkPassword(accountId: string): Promise<object>{
        let cp_response: object = {};
        await General.getAccountById(accountId).then(response => {
            if(response[Constants.KEY_DONE] == true){
                return bcrypt.compare(this._password,response['result']['password']);
            }//if(response[Constants.KEY_DONE] == true){
            else throw new InvalidCredentialsError("");
        }).then(isAuthorized =>{ 
            if(isAuthorized)
                cp_response = { authorized: true, accountId: accountId}
            else
                cp_response = { authorized: false }
        }).catch(err => {
            cp_response = { authorized: false }
        })
        return cp_response;
    }

    /**
     * Delete the account with a specific id permanently
     * @param accountId the account id to the delete
     * @returns true if the account was deleted, false otherwise
     */
    private async deleteAccountOp(accountId: string): Promise<object>{
        let mmiData: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string,
            schema: Schemas.ACCOUNTS
        }
        let account: Account = new Account(mmiData,{});
        const delete_response = await account.deleteAccount({_id: accountId});
        return {
            accountId: accountId, done: delete_response[Constants.KEY_DONE]
        } 
    }

    /**
     * Delete the photo files associated to the deleting account
     * @param accountId the account id of the user to the delete
     * @returns 
     */
    private async deletePhotoFiles(accountId: string): Promise<object>{
        let dp_response: object = {}
        await General.getAccountById(accountId).then(res => {
            return fs.rm(`${Paths.STATIC_IMG_PHOTOS}/${res['result']['username']}`,{recursive: true, force: true});
        }).then(res => {
            dp_response = { done: true }
        })
        .catch(err => {
            dp_response = { done: false }
        })
        return dp_response;
    }

    /**
     * Remove the photos related to the account to delete
     * @param accountId the accountId of the photos to remove
     * @returns 
     */
    private async deleteRelatedPhotos(accountId: string): Promise<object>{
        let mmisData: MongoDbModelsManagerInterface = {
            collection_name: process.env.MONGODB_PHOTOS_COLLECTION as string,
            schema: Schemas.PHOTOS
        }
        let photos: Photos = new Photos(mmisData,{});
        const delete_photos = await photos.deletePhotos({accountId: accountId});
        if(delete_photos[Constants.KEY_DONE])
            return {done: true, accountId: accountId}
        return {done: false}
    }

    /**
     * Remove the tokens related to the account to delete
     * @param accountId the accountId of the tokens to remove
     * @returns 
     */
    private async deleteRelatedTokens(accountId: string): Promise<object>{
        let mmisData: MongoDbModelsManagerInterface = {
            collection_name: process.env.MONGODB_TOKENS_COLLECTION as string,
            schema: Schemas.TOKENS
        }
        let tokens: Tokens = new Tokens(mmisData,{});
        const delete_tokens = await tokens.deleteTokens({accountId: accountId});
        if(delete_tokens[Constants.KEY_DONE])
            return {done: true, accountId: accountId}
        return {done: false}
    }
    
}