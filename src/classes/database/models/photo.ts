import { MongoDbModelManager, MongoDbModelManagerInterface } from "../mongodbmodelmanager";

export interface PhotoInterface{
    id?: string;
    accountId?: string;
    creationDate?: string;
    path?: string;
}

export class Photo extends MongoDbModelManager{
    private _id: string;
    private _accountId: string;
    private _creationDate: string;
    private _path: string;

    constructor(data_mmi: MongoDbModelManagerInterface, data: PhotoInterface){
        super(data_mmi);
        if(data.id)this._id = data.id;
        if(data.accountId)this._accountId = data.accountId;
        if(data.creationDate)this._creationDate = data.creationDate;
        if(data.path)this._path = data.path;
    }

    get id(){ return this._id; }
    get accountId(){return this._accountId; }
    get creationDate(){return this._creationDate; }
    get path(){return this._path; }
    get error(){
        if(this._errno < 50){
            return super.error;
        }
        switch(this._errno){

        }
        return this._error;
    }

}