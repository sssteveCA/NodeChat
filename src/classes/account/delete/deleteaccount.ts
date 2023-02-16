
import { Constants } from '../../../namespaces/constants';
import { Schemas } from '../../../namespaces/schemas';
import { Account } from '../../database/models/account';
import { MongoDbModelManagerInterface } from '../../database/mongodbmodelmanager';
import { General } from '../../general';
import bcrypt from 'bcrypt';
import { InvalidCredentialsError } from '../../errors/invalidcredentialserror';
import { AccountNotFoundError } from '../../errors/accountnotfounderror';

export interface DeleteAccountInterface{
    token_key: string;
    password: string;
}

export class DeleteAccount{
    private _token_key: string;
    private _password: string;
    private _errno: number = 0;
    private _error: string|null = null;

    constructor(data: DeleteAccountInterface){
        this._token_key = data.token_key;
        this._password = data.password;
    }

    get errno(){return this._errno;}
    get error(){return this._error;}

    public async deleteAccount(): Promise<object>{
        let response: object = {};
        this._errno = 0;
        await General.getAccountId(this._token_key).then(accountId => {
            if(accountId != null) return this.checkPassword(accountId);
            else throw new AccountNotFoundError("");
        }).then(cp_response => {
            if(cp_response['authorized'] == true){

            }
            else throw new InvalidCredentialsError("")
        })
        .catch(err => {
            if(err instanceof AccountNotFoundError){

            }
            else if(err instanceof InvalidCredentialsError){

            }
            else{

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
                return bcrypt.compare(this._password,response['result']['password_hash']);
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