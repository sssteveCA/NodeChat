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

}