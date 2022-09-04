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

    private static CONNECTION_ERROR_MSG: string = "Errore durante la connessione al database";

    get mongodb_string(){return this._mongodb_string;}
    get environment(){return this._environment;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case MongoDbModelManager.CONNECTION_ERROR:
                this._error = MongoDbModelManager.CONNECTION_ERROR_MSG;
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
     * Get one document with provided params
     * @param params 
     * @returns 
     */
    public async get(params: object): Promise<any>{
        return await new Promise<any>((resolve,reject)=>{
            this._model.findOne(params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        });
    }

    public async insert(params: object): Promise<boolean>{
        this._errno = 0;
        return await new Promise<boolean>((resolve,reject)=>{
            let result = this._model.collection.insertOne(params);
            result.then(res => {
                if(res.insertedId)
                    resolve(true);
                else{
                    resolve(false);
                }
                    
            }).catch(err => {
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


