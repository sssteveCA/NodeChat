import { DatabaseConnectionError } from "../../errors/databaseconnectionerror";
import { MongoDbModelsManager, MongoDbModelsManagerInterface } from "../mongodbmodelsmanager";

export interface TokensInterface{

}

export class Tokens extends MongoDbModelsManager{

    constructor(data_parent: MongoDbModelsManagerInterface, data: TokensInterface){
        super(data_parent);
    }

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
        })
        return response;
    }

}