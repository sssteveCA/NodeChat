import { Model, Schema } from "mongoose";
import { Environment } from "../../enums/environment";

export abstract class MongoDbModelsManager{
    protected _connected: boolean = false;
    protected _mongodb_string: string;
    protected _environment: Environment = Environment.local;
    protected _collection_name: string;
    protected _schema: Schema;
    protected _model: Model<any>;
    protected _errno: number = 0;
    protected _error:string|null = null;

    public static CONNECTION_ERROR: number = 1;
    public static GET_ERROR: number = 2;
    public static INSERT_ERROR: number = 3;
    public static UPDATE_ERROR: number = 4;
    public static DELETE_ERROR: number = 5;
    public static DISCONNECTION_ERROR: number = 6;
    public static DROPINDEXES_ERROR: number = 7;
    public static REPLACE_ERROR: number = 8;

    protected static CONNECTION_ERROR_MSG: string = "Errore durante la connessione al database";
    protected static GET_ERROR_MSG: string = "Errore durante la lettura dei dati";
    protected static INSERT_ERROR_MSG: string = "Errore durante l'inserimento dei dati";
    protected static UPDATE_ERROR_MSG: string = "Errore durante l'aggiornamento dei dati";
    protected static DELETE_ERROR_MSG: string = "Errore durante la rimozione dei dati";
    protected static DISCONNECTION_ERROR_MSG: string = "Errore durante la chiusura della connessione al database";
    protected static DROPINDEXES_ERROR_MSG: string = "Errore durante la cancellazione degli indici";
    protected static REPLACE_ERROR_MSG: string = "Errore durante la sostituzione del documento";

    constructor(data: MongoDbModelsManagerInterface){

    }

    get mongodb_string(){return this._mongodb_string;}
    get collection_name(){return this._collection_name;}
    get schema(){return this._schema;}
    get environment(){return this._environment;}
    get isConnected(){return this._connected;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case MongoDbModelsManager.CONNECTION_ERROR:
                this._error = MongoDbModelsManager.CONNECTION_ERROR_MSG;
                break;
            case MongoDbModelsManager.GET_ERROR:
                this._error = MongoDbModelsManager.GET_ERROR_MSG;
                break;
            case MongoDbModelsManager.INSERT_ERROR:
                this._error = MongoDbModelsManager.INSERT_ERROR_MSG;
                break;
            case MongoDbModelsManager.UPDATE_ERROR:
                this._error = MongoDbModelsManager.UPDATE_ERROR_MSG;
                break;
            case MongoDbModelsManager.DELETE_ERROR:
                this._error = MongoDbModelsManager.DELETE_ERROR_MSG;
                break;
            case MongoDbModelsManager.DISCONNECTION_ERROR:
                this._error = MongoDbModelsManager.DISCONNECTION_ERROR_MSG;
                break;
            case MongoDbModelsManager.DROPINDEXES_ERROR:
                this._error = MongoDbModelsManager.DROPINDEXES_ERROR_MSG;
                break;
            case MongoDbModelsManager.REPLACE_ERROR:
                this._error = MongoDbModelsManager.REPLACE_ERROR_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error = null;
    }

    set error(error: string|null){this._error = error;}
}

export interface MongoDbModelsManagerInterface{
    mongodb_string?: string;
    environment?: Environment;
    collection_name: string;
    schema: Schema;
}