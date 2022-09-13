import mongoose, { Date} from "mongoose";
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


    /**
     * Delete the first account from the collection that match with a filter
     * @param filter the filter to search the first document to delete
     * @returns 
     */
    public async deleteAccount(filter: object): Promise<object>{
        let response: object = {};
        await super.connect().then(conn => {
            return super.delete(filter);
        }).then(res => {
            console.log(res);
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
        let response: object = {};
        await super.connect().then(conn => {
            return super.get(filter);
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.warn(err);
        }).finally(()=>{
            super.close();
        });
        return response;
    }

    /**
     * Add an account to the collection
     * @param document the document to be added
     * @returns 
     */
    public async insertAccount(): Promise<object>{
        let document: object = {
            username: this._username,
            email: this._email,
            password: this._password_hash,
            activationCode: this._activationCode
        };
        let response: object = {};
        await super.connect().then(conn => {
            return super.insert(document);
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.warn(err);
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
        let response: object = {};
        await super.connect().then(conn => {
            return super.update(filter,set);
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.warn(err);
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