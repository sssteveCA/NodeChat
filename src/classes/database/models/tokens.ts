import { Constants } from "../../../namespaces/constants";
import { Schemas } from "../../../namespaces/schemas";
import { DatabaseConnectionError } from "../../errors/databaseconnectionerror";
import { MongoDbModelManagerInterface } from "../mongodbmodelmanager";
import { MongoDbModelsManager, MongoDbModelsManagerInterface } from "../mongodbmodelsmanager";
import { Token, TokenInterface } from "./token";

export interface TokensInterface{

}

export class Tokens extends MongoDbModelsManager{

    /**
     * Array of Token objects find result
     */
    private _results: Token[];

    constructor(data_parent: MongoDbModelsManagerInterface, data: TokensInterface){
        super(data_parent);
    }

    get results(){ return this._results; }
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
     * Delete all the token from the collection that match with a filter
     * @param filter the filter to search the documents to delete
     * @returns 
     */
    public async deleteTokens(filter: object): Promise<object>{
        let response: object = {}
        this._errno = 0;
        await super.connect().then(conn => {
            if(conn == true){
                return super.delete(filter);
            }
            else throw new DatabaseConnectionError(this.error as string);
        }).then(deleted => {
            if(this._errno == 0) response = {done: true}
            else throw new Error("")
        }).catch(err => {
            response = {done: false}
        }).finally(()=>{
            super.close();
        })
        return response;
    }

    public async getTokens(filter: object): Promise<object>{
        this._errno = 0;
        this._results = [];
        let response: object = {
            result: []
        }
        await super.connect().then(conn => {
            if(conn == true) return super.get(filter);
            else throw new DatabaseConnectionError(this.error as string);
        }).then(res => {
            response[Constants.KEY_DONE] = true;
            //Check if results is a non empty Array of objects
            if(Array.isArray(res) && res.length > 0){
                let mmiData: MongoDbModelManagerInterface = {
                    collection_name: process.env.MONGODB_TOKENS_COLLECTION as string,
                    schema: Schemas.TOKENS
                }
                res.forEach(token => {
                  let tokenData: TokenInterface = {
                    id: token['id'],
                    accountId: token['accountId'],
                    tokenKey: token['tokenKey'],
                    creationDate: token['creationDate'],
                    expireDate: token['expireDate']
                  }
                  let tokenObj: Token = new Token(mmiData,tokenData);
                  this._results.push(tokenObj); 
                });
                response['result'] = this._results;
            }//if(Array.isArray(res) && res.length > 0){
        }).catch(err => {
            response = {done: false}
        }).finally(()=> {
            super.close();
        })
        return response;
    }

    /**
     * Update the token documents from the collection that match a filter with the set data
     * @param filter the filter to search the documents to update
     * @param set the data to updated the matched documents
     * @returns 
     */
    public async updateTokens(filter: object, set: object): Promise<object>{
        this._errno = 0;
        let response: object = {};
        await super.connect().then(conn => {
            if(conn == true) return super.dropIndexes();
            else throw new DatabaseConnectionError("");
        }).then(dropped => {
            return super.update(filter,set);
        }).then(updated => {
            response = {done: true, result: updated}
        }).catch(err =>{
            response = {done: false}
        }).finally(()=>{
            super.close();
        })
        return response;

    }

}