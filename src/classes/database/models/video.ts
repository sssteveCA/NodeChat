import { MongoDbModelManager, MongoDbModelManagerInterface } from "../mongodbmodelmanager";

export interface VideoInterface{
    id?: string;
    accountId?: string;
    creationDate?: string;
    path?: string;
}

export class Video extends MongoDbModelManager{
    private _id: string;
    private _accountId: string;
    private _creationDate: string;
    private _path: string;

    public static MISSINGDATA_ERROR: number = 50;

    private static MISSINGDATA_ERROR_MSG: string = "Uno o più dati richiesti sono mancanti";

    constructor(data_mmi: MongoDbModelManagerInterface, data: VideoInterface){
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
            case Video.MISSINGDATA_ERROR:
                this._error = Video.MISSINGDATA_ERROR_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }
}