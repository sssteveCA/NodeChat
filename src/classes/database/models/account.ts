import mongoose, { Date} from "mongoose";
import { DatabaseConnectionError } from "../../errors/databaseconnectionerror";
import { DuplicateKeysError } from "../../errors/duplicatekeyserror";
import { MongoDbModelManager, MongoDbModelManagerInterface } from "../mongodbmodelmanager";

export interface AccountInterface{
    username?: string,
    email?: string,
    password_hash?: string,
    activationCode?: string
}

export class Account extends MongoDbModelManager{

    private _username:string;
    private _email:string;
    private _password: string;
    private _password_hash: string;
    private _creationDate: Date;
    private _activationCode: string;
    private _resetCode: string;
    private _verified: boolean;
    private _resetted: boolean;

    //Errors
    public static DUPLICATEKEYS_ERROR:number = 50;

    public static DUPLICATEKEYS_ERROR_MSG:string = "Esiste già un account con questo nome o con questo indirizzo email";

    constructor(data_parent: MongoDbModelManagerInterface, data: AccountInterface){
        super(data_parent);
        this.setValues(data);
    }

    get username(){return this._username;}
    get email(){return this._email;}
    get password_hash(){return this._password_hash;}
    get creationDate(){return this._creationDate;}
    get activationCode(){return this._activationCode;}
    get resetCode(){return this._resetCode;}
    get verified(){return this._verified;}
    get resetted(){return this._resetted;}
    get error(){
        if(this._errno < 50){
            return super.error;
        }
        switch(this._errno){
            case Account.DUPLICATEKEYS_ERROR:
                this._error = Account.DUPLICATEKEYS_ERROR_MSG;
                break;
            default:
                this._error = null;
                return this._error;
        }
        return this._error;
    }


    /**
     * Delete the first account from the collection that match with a filter
     * @param filter the filter to search the first document to delete
     * @returns 
     */
    public async deleteAccount(filter: object): Promise<object>{
        this._errno = 0;
        let response: object = {};
        await super.connect().then(conn => {
            if(conn == true){
                return super.delete(filter);
            }
            else{
                this._errno = MongoDbModelManager.CONNECTION_ERROR;
                throw new DatabaseConnectionError(this.error as string);
            }
        }).then(res => {
            //console.log(res);
        }).catch(err => {
            console.warn(err);
        }).finally(()=>{
            super.close();
        });
        return response;
    }

    /**
     * Get the first account from the collection that match with a filter
     * @param filter the filter to search the first document to get
     * @returns 
     */
    public async getAccount(filter: object): Promise<object>{
        this._errno = 0;
        let response: object = {};
        await super.connect().then(conn => {
            if(conn == true){
                return super.get(filter);
            }
            else{
                this._errno = MongoDbModelManager.CONNECTION_ERROR;
                throw new DatabaseConnectionError(this.error as string);
            }       
        }).then(res => {   
            response = {
                done: true,
                result: res
            };
            /* console.log("getAccount");
            console.log(response); */
        }).catch(err => {
            console.warn(err);
            this._errno = MongoDbModelManager.GET_ERROR;
            response = {
                done: false,
                msg: this.error
            };
        }).finally(()=>{
            super.close();
        });
        return response;
    }

    /**
     * Add an account to the collection
     * @returns 
     */
    public async insertAccount(): Promise<object>{
        this._errno = 0;
        let document: object = {
            username: this._username,
            email: this._email,
            password: this._password_hash,
            activationCode: this._activationCode
        };
        let response: object = {};
        await super.connect().then(conn => {
            if(conn == true){
                return super.dropIndexes();
            }
            else{
                this._errno = MongoDbModelManager.CONNECTION_ERROR;
                throw new DatabaseConnectionError(this.error as string);
            } 
        }).then(res => {
            return super.get({$or: [{username: this._username},{email: this._email}]});
        }).then(result => {
            if(result != null){
                //console.log(`Account get before insert => ${result} `);
                if(result['username'] == this._username || result['email'] == this._email){
                    this._errno = Account.DUPLICATEKEYS_ERROR;
                    throw new DuplicateKeysError(this.error as string);
                }
            }
            return super.insert(document);
        }).then(res => {
            //console.log(res);
            response['errno'] = 0;
        }).catch(err => {
            console.warn(err);
            response['errno'] = this._errno;
        }).finally(()=>{
            super.close();
        });
        return response;
    }

    /**
     * Updated the first account from the collection that match with a filter with the set data
     * @param filter the filter to search the first document to update
     * @param set the data to updated the matched document
     * @returns 
     */
    public async updateAccount(filter: object, set: object): Promise<object>{
        this._errno = 0;
        let response: object = {};
        await super.connect().then(conn => {
            if(conn == true){
                return super.dropIndexes();
            }
            else throw new DatabaseConnectionError('Errore durante la connessione al Database');
        }).then(res => {
            return super.update(filter,set);
        }).then(res => {
            //console.log(res);
            response = {
                done: true,
                result: res
            };
        }).catch(err => {
            console.warn(err);
            response = {
                done: false,
                msg: err.message
            };
        }).finally(()=>{
            super.close();
        });
        return response;
    }

    private setValues(data: AccountInterface){
        if(data.username)this._username = data.username;
        if(data.email)this._email = data.email;
        if(data.password_hash)this._password_hash = data.password_hash;
        if(data.activationCode)this._activationCode = data.activationCode;
    }
}