import { DatabaseConnectionError } from "../../errors/databaseconnectionerror";
import { MongoDbModelManager, MongoDbModelManagerInterface } from "../mongodbmodelmanager";

export interface TokenInterface{
    account_id?: string; 
}

export class Token extends MongoDbModelManager{
    private _id: string;
    private _accountId: string;
    private _tokenKey: string;
    private _creationDate: Date;
    private _expireDate: Date;

    constructor(data_mmi: MongoDbModelManagerInterface, data: TokenInterface){
        super(data_mmi);
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
     public async deletToken(filter: object): Promise<object>{
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
        let document: object = {
            accountId: this._accountId
        };
        let response: object = {};
        await super.connect().then(conn => {
            if(conn == true){
                return super.get({accountId: this._accountId});
            }
            else{
                throw new DatabaseConnectionError(this.error as string);
            } 
        }).then(result => {
            if(result != null){
                console.log(`Token get before insert => ${result} `);
                return super.delete({accountId: this._accountId});
            }
            return true;
        }).then(res => {
            console.log("Insert token delete promise res => ");
            console.log(res);
            if(res == true || res.deletedCount > 0){

            }//if(res == true || res.deletedCount > 0){
            else{
                throw new Error(this.error as string);
            }
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

    private setValues(data: TokenInterface){
        if(data.account_id)this._accountId = data.account_id;
    }
}