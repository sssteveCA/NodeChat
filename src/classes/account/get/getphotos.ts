import { Constants } from "../../../namespaces/constants";
import { Schemas } from "../../../namespaces/schemas";
import { Photos } from "../../database/models/photos";
import { MongoDbModelsManagerInterface } from "../../database/mongodbmodelsmanager";
import { General } from "../../general";

export interface GetPhotosInterface{
    token_key: string;
}

export class GetPhotos{

    private _token_key: string;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_ACCOUNT_ID:number = 1;
    public static ERR_GET_PHOTOS:number = 2;

    private static ERR_ACCOUNT_ID_MSG:string = "L'id dell'account non è stato trovato";
    private static ERR_GET_PHOTOS_MSG:string = "Errore durante la lettura delle immagini";

    constructor(data: GetPhotosInterface){
        this._token_key = data.token_key;
    }

    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case GetPhotos.ERR_ACCOUNT_ID:
                this._error = GetPhotos.ERR_ACCOUNT_ID_MSG;
                break;
            case GetPhotos.ERR_GET_PHOTOS:
                this._error = GetPhotos.ERR_GET_PHOTOS_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    /**
     * Get the photos uploaded by the logged user
     * @returns 
     */
    public async getPhotos(): Promise<object>{
        this._errno = 0;
        let accountId: string|null = await General.getAccountId(this._token_key);
        if(accountId != null){
            let photos_list: object = await this.getUserPhotos(accountId);
            if(photos_list[Constants.KEY_DONE] == false)
                this._errno = GetPhotos.ERR_GET_PHOTOS;
            return photos_list;
        }//if(accountId != null){
        this._errno = GetPhotos.ERR_ACCOUNT_ID;
        return {done: false}

    }

    private async getUserPhotos(accountId: string): Promise<object>{
        let mmis_data: MongoDbModelsManagerInterface = {
            collection_name: process.env.MONGODB_PHOTOS_COLLECTION as string,
            schema: Schemas.PHOTOS
        }
        let photos: Photos = new Photos(mmis_data,{});
        await photos.getPhotos({accountId: accountId});
        if(photos.errno == 0)
            return { done: true,result: photos.results }
        return { done: false }
    }
}