import mongoose from "mongoose";
import { AccountType } from "../../../types/accounttype";
import { DatabaseConnectionError } from "../../errors/databaseconnectionerror";
import { DuplicateKeysError } from "../../errors/duplicatekeyserror";
import { MissingDataError } from "../../errors/missingdataerror";
import { General } from "../../general";
import { MongoDbModelManager, MongoDbModelManagerInterface } from "../mongodbmodelmanager";

export interface AccountInterface{
    id?: string,
    name?: string;
    surname?: string;
    username?: string,
    email?: string,
    password_hash?: string,
    creationDate?: string,
    activationCode?: string|null,
    resetCode?: string|null,
    verified?: boolean,
    resetted?: boolean,
    images?: object
}

export class Account extends MongoDbModelManager{

    private _id: string;
    private _name: string;
    private _surname: string;
    private _username:string;
    private _email:string;
    private _password: string;
    private _password_hash: string;
    private _creationDate: string;
    private _activationCode: string|null;
    private _resetCode: string|null;
    private _verified: boolean = false;
    private _resetted: boolean = false;
    private _contacts: object;
    private _education: object;
    private _employment: string;
    private _images: object;
    private _otherPersonals: object;
    private _videos: object;

    //Errors
    public static DUPLICATEKEYS_ERROR:number = 50;
    public static MISSINGDATA_ERROR: number = 51;

    public static DUPLICATEKEYS_ERROR_MSG:string = "Esiste già un account con questo nome o con questo indirizzo email";
    private static MISSINGDATA_ERROR_MSG: string = "Uno o più dati richiesti sono mancanti";

    constructor(data_parent: MongoDbModelManagerInterface, data: AccountInterface){
        super(data_parent);
        this.setValues(data);
    }

    get id(){return this._id;}
    get name(){return this._name;}
    get surname(){return this._surname;}
    get username(){return this._username;}
    get email(){return this._email;}
    get password_hash(){return this._password_hash;}
    get creationDate(){return this._creationDate;}
    get activationCode(){return this._activationCode;}
    get resetCode(){return this._resetCode;}
    get verified(){return this._verified;}
    get resetted(){return this._resetted;}
    get contacts(){return this._contacts;}
    get education(){return this._education;}
    get employment(){return this._employment;}
    get images(){return this._images;}
    get otherPersonals(){return this._otherPersonals;}
    get videos(){return this._videos;}
    get error(){
        if(this._errno < 50){
            return super.error;
        }
        switch(this._errno){
            case Account.DUPLICATEKEYS_ERROR:
                this._error = Account.DUPLICATEKEYS_ERROR_MSG;
                break;
            case Account.MISSINGDATA_ERROR:
                this._error = Account.MISSINGDATA_ERROR_MSG;
                break;
            default:
                this._error = null;
                return this._error;
        }
        return this._error;
    }

    set creationDate(creation_date: string){this._creationDate = creation_date;}


    /**
     * Delete the first account from the collection that match with a filter
     * @param filter the filter to search the first document to delete
     * @returns 
     */
    public async deleteAccount(filter: object): Promise<object>{
        this._errno = 0;
        let response: object = {};
        await super.connect().then(conn => {
            if(conn == true) return super.delete(filter);
            else throw new DatabaseConnectionError(this.error as string);
        }).then(res => {
            response = { done: true };
        }).catch(err => {
            console.warn(err);
            response = { done: false};
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
            if(conn == true) return super.get(filter);
            else throw new DatabaseConnectionError(this.error as string); 
        }).then(res => {   
            response = {
                done: true,
                result: res
            };
            if(res != null){
                if(res["_id"])this._id = res["_id"];
                if(res["name"])this._name = res["name"];
                if(res["surname"])this._surname = res["surname"];
                if(res["username"])this._username = res["username"];
                if(res["email"])this._email = res["email"];
                if(res["password_hash"])this._password_hash = res["password_hash"];
                if(res["creationDate"])this._creationDate = res["creationDate"];
                if(res["activationCode"])this._activationCode = res["activationCode"];
                if(res["resetCode"])this._resetCode = res["resetCode"];
                if(res["verified"])this._verified = res["verified"];
                if(res["resetted"])this._resetted = res["resetted"];
                if(res["contacts"])this._contacts = res["contacts"];
                if(res["education"])this._education = res["education"];
                if(res["employment"])this._employment = res["employment"];
                if(res["images"])this._images = res["images"];
                if(res["otherPersonals"])this._otherPersonals = res["otherPersonals"];
                if(res["videos"])this._videos = res["videos"];
            }
        }).catch(err => {
            console.warn(err);
            response = {
                done: false,
                message: this.error
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
        let response: object = {};
        try{
            if(this._name && this._surname && this._username && this._email && this._password_hash && this._activationCode){
                let current: Date = new Date();
                this._creationDate = General.dateString(current);
                /* let document: object = {
                    name: this._name, surname: this._surname,
                    username: this._username,email: this._email,password: this._password_hash,
                    creationDate: this._creationDate, activationCode: this._activationCode,
                }; */
                let document: AccountType = {
                    name: this._name, surname: this._surname,
                    username: this._username,email: this._email,password: this._password_hash,
                    creationDate: new Date(current), activationCode: this._activationCode,
                };
                await super.connect().then(conn => {
                    if(conn == true)return super.dropIndexes();
                    else throw new DatabaseConnectionError(this.error as string);
                }).then(res => {
                    return super.get({$or: [{username: this._username},{email: this._email}]});
                }).then(result => {
                    if(result != null){
                        if(result['username'] == this._username || result['email'] == this._email){
                            this._errno = Account.DUPLICATEKEYS_ERROR;
                            throw new DuplicateKeysError(this.error as string);
                        }
                    }
                    return super.insert(document);
                }).then(res => {
                    response['errno'] = 0;
                }).catch(err => {
                    console.warn(err);
                    response['errno'] = this._errno;
                }).finally(()=>{
                    super.close();
                });
            }//if(this._username && this._email && this._password_hash && this._creationDate && this._activationCode){
            else{
                this._errno = Account.MISSINGDATA_ERROR;
                throw new MissingDataError(this.error as string);
            }
        }catch(e){
            response['errno'] = this._errno;
        }
        return response;
    }

    /**
     * Replace the account that match the filter with new account
     * @param filter the filter to search the first document to replace
     * @param document the new document to replace the matched document
     * @returns 
     */
     public async replaceAccount(filter: object, document: object): Promise<object>{
        this._errno = 0;
        let response: object = {};
        await super.connect().then(conn => {
            if(conn == true) return super.replace(filter,document);
            else throw new DatabaseConnectionError('Errore durante la connessione al Database');
        }).then(res => {
            response = {
                done: true,
                result: res
            };
        }).catch(err => {
            console.warn(err);
            response = {
                done: false,
                message: err.message
            };
        }).finally(()=>{
            super.close();
        });
        return response;
    }

    /**
     * Update the first account from the collection that match with a filter with the set data
     * @param filter the filter to search the first document to update
     * @param set the data to updated the matched document
     * @returns 
     */
    public async updateAccount(filter: object, set: object): Promise<object>{
        this._errno = 0;
        let response: object = {};
        await super.connect().then(conn => {
            if(conn == true) return super.dropIndexes();
            else throw new DatabaseConnectionError('Errore durante la connessione al Database');
        }).then(res => {
            return super.update(filter,set);
        }).then(res => {
            response = {
                done: true,
                result: res
            };
        }).catch(err => {
            console.warn(err);
            response = {
                done: false,
                message: err.message
            };
        }).finally(()=>{
            super.close();
        });
        return response;
    }

    private setValues(data: AccountInterface){
        if(data.name)this._name = data.name;
        if(data.surname)this._surname = data.surname;
        if(data.username)this._username = data.username;
        if(data.email)this._email = data.email;
        if(data.password_hash)this._password_hash = data.password_hash;
        if(data.creationDate)this._creationDate = data.creationDate;
        if(data.activationCode)this._activationCode = data.activationCode;
        if(data.resetCode)this._resetCode = data.resetCode;
        if(data.verified)this._verified = data.verified;
        if(data.resetted)this._resetted = data.resetted;
        if(data.images)this._images = data.images;
    }   
}