import { DatabaseConnectionError } from "../../errors/databaseconnectionerror";
import { MongoDbModelManager, MongoDbModelManagerInterface } from "../mongodbmodelmanager";

export interface TokenInterface{
    account_id?: string; 
}

export class Token extends MongoDbModelManager{
    private _id: string;
    private _accountId: string;
    private _tokenKey: string;
    private _creationDate: string;
    private _expireDate: string;

    constructor(data_mmi: MongoDbModelManagerInterface, data: TokenInterface){
        super(data_mmi);
        this.setValues(data);
    }

    get id(){return this._id;}
    get accountId(){return this._accountId;}
    get tokenKey(){return this._tokenKey;}
    get creationDate(){return this._creationDate;}
    get expireDate(){return this._id;}
    get error(){
        if(this._errno < 50){
            return super.error;
        }
        switch(this._errno){
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    /**
     * Delete the first token from the collection that match with a filter
     * @param filter the filter to search the first document to delete
     * @returns 
     */
     public async deleteToken(filter: object): Promise<object>{
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
     * Get the first token from the collection that match with a filter
     * @param filter the filter to search the first document to get
     * @returns 
     */
     public async getToken(filter: object): Promise<object>{
        this._errno = 0;
        let response: object = {};
        await super.connect().then(conn => {
            if(conn == true){
                return super.get(filter);
            }
            else{
                throw new DatabaseConnectionError(this.error as string);
            }       
        }).then(res => {   
            response = {
                done: true,
                result: res
            };
            console.log("getToken");
            console.log(response);
            if(res != null){
                if(res["_id"])this._id = res["_id"];
                if(res["accountId"])this._accountId = res["accountId"];
                if(res["tokenKey"])this._tokenKey = res["tokenKey"];
                if(res["creationDate"])this._creationDate = res["creationDate"];
                if(res["expireDate"])this._expireDate = res["expireDate"];
            }
        }).catch(err => {
            console.warn(err);
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
     * Add a token to the collection
     * @returns 
     */
     public async insertToken(): Promise<object>{
        this._errno = 0;
        let response: object = {};
        await super.connect().then(conn => {
            if(conn == true)return super.get({accountId: this._accountId});
            else throw new DatabaseConnectionError(this.error as string);
        }).then(result => {
            if(result != null){
                console.log(`Token get before insert => ${result} `);
                let token_data: object = {
                    tokenKey: this._tokenKey,creationDate: this._creationDate,expireDate: this._expireDate
                };
                return super.replace({accountId: this._accountId},token_data);
            }//if(result != null){
            let token_data: object = {
                accountId: this._accountId, tokenKey: this._tokenKey, expireDate: this._expireDate
            }
            return super.insert(token_data);
        }).then(res => {
            console.log("Insert/Replace token promise res => ");
            console.log(res);
            if(res.acknowledged == true) response['errno'] = 0;
            else throw new Error(this.error as string);
        }).catch(err => {
            console.warn(err);
            response['errno'] = this._errno;
        }).finally(()=>{
            super.close();
        });
        return response;
    }

    /**
     * Replace the token that match the filter with new token
     * @param filter the filter to search the first document to replace
     * @param document the new document to replace the matched document
     * @returns 
     */
    public async replaceToken(filter: object, document: object): Promise<object>{
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
                msg: err.message
            };
        }).finally(()=>{
            super.close();
        });
        return response;
    }

    /**
     * Updated the first token from the collection that match with a filter with the set data
     * @param filter the filter to search the first document to update
     * @param set the data to updated the matched document
     * @returns 
     */
     public async updateToken(filter: object, set: object): Promise<object>{
        this._errno = 0;
        let response: object = {};
        await super.connect().then(conn => {
            if(conn == true) return super.update(filter,set);
            else throw new DatabaseConnectionError('Errore durante la connessione al Database');
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

    /**
     * Parse a Date object into date string
     * @param date Date
     * @returns YYYY-MM-DD hh:mm:ss string data
     */
    private dateString(date: Date):string{
        let year = date.getFullYear();
        let month = date.getMonth() < 10 ? "0"+date.getMonth() : date.getMonth();
        let day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
        let hours = date.getHours() < 10 ? "0"+date.getHours() : date.getHours();
        let minutes = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
        let seconds = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();
        let stringDate: string = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return stringDate;
    }

    private setValues(data: TokenInterface){
        if(data.account_id){
            this._accountId = data.account_id;
            let today: Date = new Date();
            this._creationDate = this.dateString(today);
        }//if(data.account_id){
    }
}