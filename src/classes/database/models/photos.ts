import { Constants } from "../../../namespaces/constants";
import { Schemas } from "../../../namespaces/schemas";
import { DatabaseConnectionError } from "../../errors/databaseconnectionerror";
import { MongoDbModelManagerInterface } from "../mongodbmodelmanager";
import { MongoDbModelsManager, MongoDbModelsManagerInterface } from "../mongodbmodelsmanager";
import { Photo, PhotoInterface } from "./photo";


export interface PhotosInterface{

}

export class Photos extends MongoDbModelsManager{

    /**
     * Array of Photo objects find result
     */
    private _results: Photo[];

    constructor(data_parent: MongoDbModelsManagerInterface, data: PhotosInterface){
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

    public async deletePhotos(filter: object): Promise<object>{
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
        });
        return response;
    }

    public async getPhotos(filter: object): Promise<object>{
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
            if(Array.isArray(res) && res.length > 0){
                let mmiData: MongoDbModelManagerInterface = {
                    collection_name: process.env.MONGODB_PHOTOS_COLLECTION as string,
                    schema: Schemas.PHOTOS
                }
                res.forEach(photo => {
                    let photoData: PhotoInterface = {
                        id: photo['_id'],
                        accountId: photo['accountId'],
                        creationDate: photo['creationDate'],
                        path: photo['path']
                    }
                    let photoObj: Photo = new Photo(mmiData, photoData);
                    this._results.push(photoObj);
                });
                response['result'] = this._results;
            }
        }).catch(err => {
            response = {done: false}
        }).finally(()=>{
            super.close();
        })
        return response;
    }
}