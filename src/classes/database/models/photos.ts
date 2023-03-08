import { MongoDbModelsManager, MongoDbModelsManagerInterface } from "../mongodbmodelsmanager";
import { Photo } from "./photo";


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
}