import { DatabaseConnectionError } from "../../errors/databaseconnectionerror";
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

    /**
     * Delete the first photo from the collection that match with a filter
     * @param filter the filter to search the first document to delete
     * @returns 
     */
    public async deletePhoto(filter: object): Promise<object>{
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

    public async getPhoto(filter: object): Promise<object>{
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
            }
            if(res != null){
                if(res["_id"])this._id = res["_id"];
                if(res["accountId"])this._accountId = res["accountId"];
                if(res["creationDate"])this._creationDate = res["_creationDate"];
                if(res["path"])this._path = res["path"];
            }//if(res != null){
        }).catch(err => {
            console.warn(err);
            response = {
                done: false,
                message: this.error
            }
        }).finally(()=>{
            super.close();
        });
        return response;
    }

}