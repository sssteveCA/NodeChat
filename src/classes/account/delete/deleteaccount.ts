
import { Constants } from '../../../namespaces/constants';
import { Schemas } from '../../../namespaces/schemas';
import { Account } from '../../database/models/account';
import { MongoDbModelManagerInterface } from '../../database/mongodbmodelmanager';
import { General } from '../../general';
import bcrypt from 'bcrypt';
import { InvalidCredentialsError } from '../../errors/invalidcredentialserror';
import { AccountNotFoundError } from '../../errors/accountnotfounderror';
import { Messages } from '../../../namespaces/messages';

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
            /* console.log("DeleteAccount deleteAccount getAccountId");
            console.log(accountId); */
            if(accountId != null) return this.checkPassword(accountId);
            else throw new AccountNotFoundError("");
        }).then(cp_response => {
            /* console.log("DeleteAccount deleteAccount checkPassword");
            console.log(cp_response); */
            if(cp_response['authorized'] == true){
                return this.deleteAccountOp(cp_response['accountId']);
            }
            else throw new InvalidCredentialsError("")
        }).then(deleted => {
            if(deleted) 
                response = {done: true, message: "Il tuo account è stato rimosso con successo", code: 200}
            else 
                throw new Error("");
        }).catch(err => {
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
            /* console.log("DeleteAccount checkPassword getAccountById");
            console.log(response); */
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
    private async deleteAccountOp(accountId: string): Promise<boolean>{
        let mmiData: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string,
            schema: Schemas.ACCOUNTS
        }
        let account: Account = new Account(mmiData,{});
        const delete_response = await account.deleteAccount({_id: accountId});
        return delete_response[Constants.KEY_DONE];
    }
    
}