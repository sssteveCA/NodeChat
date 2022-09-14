import { rejects } from "assert";
import mongoose, {Document, HydratedDocument, Model, Query, Schema } from "mongoose";


//Single collection MongoDB manager

export abstract class MongoDbModelManager{
    protected _connected: boolean = false;
    protected _mongodb_string: string;
    protected _environment: Environment = Environment.local;
    protected _model_name: string;
    protected _schema: Schema;
    protected _model: Model<any>;
    protected _errno: number = 0;
    protected _error:string|null = null;

    constructor(data: MongoDbModelManagerInterface){
        this.assignValues(data);
    }

    public static CONNECTION_ERROR: number = 1;
    public static GET_ERROR: number = 2;
    public static INSERT_ERROR: number = 3;
    public static UPDATE_ERROR: number = 4;
    public static DELETE_ERROR: number = 5;
    public static DISCONNECTION_ERROR: number = 6;

    protected static CONNECTION_ERROR_MSG: string = "Errore durante la connessione al database";
    protected static GET_ERROR_MSG: string = "Errore durante la lettura dei dati";
    protected static INSERT_ERROR_MSG: string = "Errore durante l'inserimento dei dati";
    protected static UPDATE_ERROR_MSG: string = "Errore durante l'aggiornamento dei dati";
    protected static DELETE_ERROR_MSG: string = "Errore durante la rimozione dei dati";
    protected static DISCONNECTION_ERROR_MSG: string = "Errore durante la chiusura della connessione al database";

    get mongodb_string(){return this._mongodb_string;}
    get model_name(){return this._model_name;}
    get schema(){return this._schema;}
    get environment(){return this._environment;}
    get isConnected(){return this._connected;}
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
            case MongoDbModelManager.DISCONNECTION_ERROR:
                this._error = MongoDbModelManager.DISCONNECTION_ERROR_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error = null;
    }

    set error(error: string|null){this._error = error;}


    /**
     * Assign the values to properties 
     * @param data 
     */
    private assignValues(data: MongoDbModelManagerInterface){
        this._model_name = data.model_name;
        this._schema = data.schema;
        this._model = mongoose.model(this._model_name,this._schema);
        if(data.environment)
            this._environment = data.environment;
        if(data.mongodb_string)
            this._mongodb_string = data.mongodb_string;
        else
            if(this._environment == Environment.production)
                this._mongodb_string = process.env.MONGODB_PRODUCTION_URL as string;
            else
                this._mongodb_string = process.env.MONGODB_LOCAL_URL as string;
        console.log(`mongoDB string => ${this._mongodb_string}`);
        console.log(`model name => ${this._model_name}`);
    }

    /**
     * Connect to MongoDB database
     * @returns 
     */
    public async connect(): Promise<boolean>{
        console.log("mmm connect");
        this._errno = 0;
        try{
            await mongoose.connect(this._mongodb_string).then(conn => {
                console.log(conn);
                this._connected = true;
            }).catch(err => {
                throw err;
            });
        }catch(e){
            this._errno = MongoDbModelManager.CONNECTION_ERROR;
        }
        return this._connected;
    }

    /**
     * Close the MongoDB connection
     * @returns true is close is done successfully otherwise false
     */
    public async close(): Promise<boolean>{
        let disconnected: boolean = false;
        try{
            if(mongoose.connection.readyState == 1){
                await mongoose.connection.close().then(close => {
                    disconnected = true;
                    this._connected = false;
                }).catch(err => {
                   throw err; 
                });
            } //if(mongoose.connection.readyState == 1){  
        }catch(e){
            this._errno = MongoDbModelManager.DISCONNECTION_ERROR;
        }
        return disconnected;
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
        console.log("mmm insert");
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
    environment?: Environment;
    model_name: string;
    schema: Schema;
}

enum Environment{
    local = 'local',
    production = 'production'
}


