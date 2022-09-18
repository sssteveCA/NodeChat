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

    private setValues(data: TokenInterface){
        if(data.account_id)this._accountId = data.account_id;
    }
}