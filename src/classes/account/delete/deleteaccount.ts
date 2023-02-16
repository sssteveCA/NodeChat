
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
            if(accountId == null) throw new AccountNotFoundError("");
        })
        .catch(err => {

        });
        return response;
    }

    /**
     * Check if user has provided the correct password before delete
     * @param accountId 
     * @returns 
     */
    private async checkPassword(accountId: string): Promise<boolean>{
        let authorized: boolean = false;
        await General.getAccountById(accountId).then(response => {
            if(response[Constants.KEY_DONE] == true){
                return bcrypt.compare(this._password,response['result']['password_hash']);
            }//if(response[Constants.KEY_DONE] == true){
            else throw new InvalidCredentialsError("");
        }).then(isAuthorized =>{ 
            authorized = isAuthorized;
        }).catch(err => {
            authorized = false;
        })
        return authorized;
    }

    
}