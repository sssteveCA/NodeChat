import { Constants } from "../../../namespaces/constants";
import { Schemas } from "../../../namespaces/schemas";
import { DatabaseConnectionError } from "../../errors/databaseconnectionerror";
import { MongoDbModelManagerInterface } from "../mongodbmodelmanager";
import { MongoDbModelsManager, MongoDbModelsManagerInterface } from "../mongodbmodelsmanager";
import { Video, VideoInterface } from "./video";

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

    /**
     * Delete multiple videos that match with a filter
     * @param filter the filter to search the videos to delete
     * @returns 
     */
    public async deleteVideos(filter: object): Promise<object>{
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
        }).finally(()=> {
            super.close();
        })
        return response;
    }

    /**
     * Get multiple videos that match with a filter
     * @param filter the filter to select the videos
     * @returns 
     */
    public async getVideos(filter: object): Promise<object>{
        this._errno = 0;
        this._results = [];
        let response: object = { result: [] }
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
                res.forEach(video => {
                    let videoData: VideoInterface = {
                        id: video['_id'],
                        accountId: video['accountId'],
                        creationDate: video['creationDate'],
                        path: video['path'],
                        type: video['type']
                    }
                    let videoObj: Video = new Video(mmiData,videoData);
                    this._results.push(videoObj);
                })
                response['result'] = this._results;
            }
        }).catch(err => {
            response = {done: false}
        }).finally(()=> {
            super.close();
        })
        return response;
    }
}