import { Constants } from "../../../namespaces/constants";
import { Schemas } from "../../../namespaces/schemas";
import { Videos } from "../../database/models/videos";
import { MongoDbModelsManagerInterface } from "../../database/mongodbmodelsmanager";
import { General } from "../../general";

export interface GetVideosInterface{
    token_key: string;
}

export class GetVideos{
    private _token_key: string;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_ACCOUNT_ID:number = 1;
    public static ERR_GET_VIDEOS:number = 2;

    private static ERR_ACCOUNT_ID_MSG:string = "L'id dell'account non è stato trovato";
    private static ERR_GET_VIDEOS_MSG:string = "Errore durante la lettura delle immagini";

    constructor(data: GetVideosInterface){
        this._token_key = data.token_key;
    }

    get errno(){ return this._errno; }
    get error(){
        switch(this._errno){
            case GetVideos.ERR_ACCOUNT_ID:
                this._error = GetVideos.ERR_ACCOUNT_ID_MSG;
                break;
            case GetVideos.ERR_GET_VIDEOS:
                this._error = GetVideos.ERR_GET_VIDEOS_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    /**
     * Get the videos uploaded by the logged user
     * @returns 
     */
    public async getVideos(): Promise<object>{
        this._errno = 0;
        let accountId: string|null = await General.getAccountId(this._token_key);
        if(accountId != null){
            let videosList: object = await this.getUserVideos(accountId);
            if(videosList[Constants.KEY_DONE] == false)
                this._errno = GetVideos.ERR_GET_VIDEOS;
            return videosList;
        }
        this._errno = GetVideos.ERR_ACCOUNT_ID;
        return {done: false}
    }

    private async getUserVideos(accountId: string): Promise<object>{
        let mmis_data: MongoDbModelsManagerInterface = {
            collection_name: process.env.MONGODB_VIDEOS_COLLECTION as string,
            schema: Schemas.VIDEOS
        }
        let videos: Videos = new Videos(mmis_data,{});
        await videos.getVideos({accountId: accountId});
        if(videos.errno == 0)
            return { done: true, result: videos.results }
        return { done: false }
    }
}