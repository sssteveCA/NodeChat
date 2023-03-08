import { PhotoType } from "../../../types/phototype";
import { DatabaseConnectionError } from "../../errors/databaseconnectionerror";
import { MissingDataError } from "../../errors/missingdataerror";
import { General } from "../../general";
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

    public static MISSINGDATA_ERROR: number = 50;

    private static MISSINGDATA_ERROR_MSG: string = "Uno o più dati richiesti sono mancanti";

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
            case Photo.MISSINGDATA_ERROR:
                this._error = Photo.MISSINGDATA_ERROR_MSG;
                break;
            default:
                this._error = null;
                break;
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

    /**
     * Get the first token from the collection that match with a filter
     * @param filter the filter to search the first document to get
     * @returns 
     */
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

    /**
     * Add a photo document to the collection
     * @returns 
     */
    public async insertPhoto(): Promise<object>{
        this._errno = 0;
        let response: object = {};
        try{
            if(this._accountId && this._path){
                await super.connect().then(conn => {
                    if(conn == true) return super.get({accountId: this._accountId});
                    else{
                        this._errno = MongoDbModelManager.CONNECTION_ERROR;
                        throw new DatabaseConnectionError(this.error as string);
                    } 
                }).then(result => {
                    if(result != null){
                        let document: object = {
                            accountId: this._accountId,
                            creationDate: this._creationDate,
                            path: this._path
                        }
                        return super.replace({accountId: this._accountId},document);
                    }//if(result != null){
                    let today: Date = new Date();
                    this._creationDate = General.dateString(today);
                    let document: PhotoType = {
                        accountId: this._accountId,
                        creationDate: new Date(this._creationDate),
                        path: this._path
                    }
                    return super.insert(document);
                }).then(res => {
                    response = { done: true }
                }).catch(err => {
                    throw err;
                }).finally(()=> {
                    super.close();
                });
            }//if(this._accountId && this._path){
            else{
                this._errno = Photo.MISSINGDATA_ERROR;
                throw new MissingDataError(this.error as string);
            }
        }catch(e){
            response = {done: false};
        }
        return response;
    }

    /**
     * Replace the photo that match the filter with new photo
     * @param filter the filter to search the first document to replace
     * @param document the new document to replace the matched document
     * @returns 
     */
    public async replacePhoto(filter: object, document: object): Promise<object>{
        this._errno = 0;
        let response: object = {}
        await super.connect().then(conn => {
            if(conn == true) return super.replace(filter, document);
            else{
                this._errno = MongoDbModelManager.CONNECTION_ERROR;
                throw new DatabaseConnectionError(this.error as string);
            }
        }).then(res => {
            response = {
                done: true,
                result: res
            }
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

    /**
     * Update the first photo from the collection that match with a filter with the set data
     * @param filter the filter to search the first document to update
     * @param set the data to updated the matched document
     * @returns 
     */
    public async updatePhoto(filter: object, set: object): Promise<object>{
        this._errno = 0;
        let response: object = {};
        await super.connect().then(conn => {
            if(conn == true) return super.update(filter,set);
            else{
                this._errno = MongoDbModelManager.CONNECTION_ERROR;
                throw new DatabaseConnectionError(this.error as string);
            } 
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
                message: this.error
            };
        }).finally(()=>{
            super.close();
        });
        return response;
    }

}