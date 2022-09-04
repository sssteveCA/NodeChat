import { rejects } from "assert";
import mongoose, { Document, HydratedDocument, Model, Query } from "mongoose";


//Single collection MongoDB manager

export abstract class MongoDbModelManager<T extends Document>{
    private _mongodb_string: string;
    private _environment: Environment = Environment.local;
    private readonly _model: Model<T>;
    private _errno: number = 0;
    private _error:string|null = null;

    constructor(data: MongoDbModelManagerInterface){
        this.assignValues(data);
    }

    public static CONNECTION_ERROR: number = 1;
    public static GET_ERROR: number = 2;
    public static INSERT_ERROR: number = 3;
    public static UPDATE_ERROR: number = 4;
    public static DELETE_ERROR: number = 5;

    private static CONNECTION_ERROR_MSG: string = "Errore durante la connessione al database";
    public static GET_ERROR_MSG: string = "Errore durante la lettura dei dati";
    public static INSERT_ERROR_MSG: string = "Errore durante l'inserimento dei dati";
    public static UPDATE_ERROR_MSG: string = "Errore durante l'aggiornamento dei dati";
    public static DELETE_ERROR_MSG: string = "Errore durante la rimozione dei dati";

    get mongodb_string(){return this._mongodb_string;}
    get environment(){return this._environment;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case MongoDbModelManager.CONNECTION_ERROR:
                this._error = MongoDbModelManager.CONNECTION_ERROR_MSG;
                break;
            case MongoDbModelManager.GET_ERROR:
                this._error = MongoDbModelManager.GET_ERROR_MSG;
                break;
            case MongoDbModelManager.INSERT_ERROR:
                this._error = MongoDbModelManager.INSERT_ERROR_MSG;
                break;
            case MongoDbModelManager.UPDATE_ERROR:
                this._error = MongoDbModelManager.UPDATE_ERROR_MSG;
                break;
            case MongoDbModelManager.DELETE_ERROR:
                this._error = MongoDbModelManager.DELETE_ERROR_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error = null;
    }


    /**
     * Assign the values to properties 
     * @param data 
     */
    private assignValues(data: MongoDbModelManagerInterface){
        if(data.mongodb_string)
            this._mongodb_string = data.mongodb_string;
        else
            if(this._environment = Environment.production)
                this._mongodb_string = process.env.MONGODB_PRODUCTION_URL as string;
            else
                this._mongodb_string = process.env.MONGODB_LOCAL_URL as string;
    }

    /**
     * Connect to MongoDB database
     * @returns 
     */
    public async connect(): Promise<boolean>{
        let connected: boolean = false;
        this._errno = 0;
        try{
            await mongoose.connect(this._mongodb_string).then(conn => {
                console.log(conn);
                connected = true;
            }).catch(err => {
                throw err;
            });
        }catch(e){
            this._errno = MongoDbModelManager.CONNECTION_ERROR;
        }
        return connected;
    }

    /**
     * Delete one document with provided filter
     * @param filter 
     * @returns 
     */
    public async delete(filter: object): Promise<any>{
        return await new Promise<any>((resolve, reject) => {
            let delete_query = this._model.deleteOne(filter);
            delete_query.then(res => {
                resolve(res);
            }).catch(err => {
                this._errno = MongoDbModelManager.DELETE_ERROR;
                reject(err);
            });
        });
    }

    /**
     * Get one document with provided filter
     * @param filter 
     * @returns 
     */
    public async get(filter: object): Promise<any>{
        this._errno = 0;
        return await new Promise<any>((resolve,reject)=>{
            this._model.findOne(filter).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        });
    }

    /**
     * Insert new document in the collection
     * @param document
     * @returns 
     */
    public async insert(document: object): Promise<any>{
        this._errno = 0;
        return await new Promise<any>((resolve,reject)=>{
            let result = this._model.collection.insertOne(document);
            result.then(res => {
                resolve(res);  
            }).catch(err => {
                this._errno = MongoDbModelManager.INSERT_ERROR;
                reject(err);
            });
        });
    }

    /**
     * Update one document that match with filter with set object data
     * @param filter 
     * @param set 
     * @returns 
     */
    public async update(filter: object, set: object): Promise<any>{
        return await new Promise<any>((resolve, reject)=>{
            let update_query = this._model.updateOne(filter, set);
            update_query.then(res => {
                resolve(res);
            }).catch(err => {
                this._errno = MongoDbModelManager.UPDATE_ERROR;
                reject(err);
            });
        });
    }

}

export interface MongoDbModelManagerInterface{
    mongodb_string?: string;
}

enum Environment{
    local = 'local',
    production = 'production'
}


