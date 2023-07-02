import { MongoDbModelsManager, MongoDbModelsManagerInterface } from "../mongodbmodelsmanager";
import { Video } from "./video";

export interface VideosInterface{}

export class Videos extends MongoDbModelsManager{

    /**
     * Array of Videos objects find result
     */
    private _results: Video[];

    constructor(data_parent: MongoDbModelsManagerInterface, data: VideosInterface){
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