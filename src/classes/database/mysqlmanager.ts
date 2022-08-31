
import mysql from 'mysql2';
import mysqlPromise from 'mysql2/promise';

export interface MySqlManagerInterface{
     host: string;
     user: string;
     password: string
     database: string;
     query: string;
     connLimit?: number;
     queueLimit?: number;
}

export class MySqlManager{
    private _host: string;
    private _user: string;
    private _database: string;
    private _query: string; //MySQL Query(without field values)
    private _values: Array<any>; //Values for MySQL query
    private _connLimit: number;
    private _queueLimit: number;
    private _pool: mysql.Pool;
    private _poolPromise: mysqlPromise.Pool;
    private _errno: number = 0;
    private _error: string|null = null;

    public static QUERY_ERROR: number = 1;

    public static QUERY_ERROR_MSG: string = "Impossibile ottenere i dati dal database;"

    constructor(data: MySqlManagerInterface){
        this._host = data.host;
        this._user = data.user;
        this._database = data.database;
        this._query = data.query;
        if(data.connLimit)
            this._connLimit = data.connLimit;
        else
            this._connLimit = 10;
        if(data.queueLimit)
            this._queueLimit = data.queueLimit;
        else
            this._queueLimit = 0;
        this._pool = mysql.createPool({
            host: this._host,
            user: this._user,
            password: data.password,
            database: this._database,
            waitForConnections: true,
            connectionLimit: this._connLimit,
            queueLimit: this._queueLimit
        });
        this._poolPromise = this._pool.promise();
    }

    get host(){return this._host;}
    get user(){return this._user;}
    get database(){return this._database;}
    get query(){return this._query;}
    get values(){return this._values;}
    get connLimit(){return this._connLimit;}
    get queueLimit(){return this._queueLimit;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            default:
                case MySqlManager.QUERY_ERROR:
                    this._error = MySqlManager.QUERY_ERROR_MSG;
                    break;
                this._error = null;
                break;
        }
        return this._errno;
    }

    set query(query: string){this._query = query;}
    set values(values: Array<any>){this._values = values;}

    /**
     * Execute a read query
     * @returns Promise
     */
    public async readQuery(): Promise<object>{
        let response: object = {};
        this._errno = 0;
        try{
            await this.readQueryPromise().then(res => {
                response = {
                    done: true,
                    data: res
                };
            }).catch(err => {
                throw err;
            });
        }catch(e){
            console.error(e);
            this._errno = MySqlManager.QUERY_ERROR;
            response = {
                done: false,
                message: MySqlManager.QUERY_ERROR_MSG
            };
        }
        return response;
    }

    private async readQueryPromise(): Promise<object>{
        return await new Promise<object>((resolve,reject)=>{
            this._pool.query(this._query, this._values, (err,result,fields) => {
                if(err){
                    reject(err);
                }
                resolve({
                    fields: fields,
                    result: result
                });
            });
        });
    }


    /**
     * Execute a write query
     * @returns Promise
     */
    public async writeQuery(): Promise<object>{
        let response: object = {};
        this._errno = 0;
        try{
            await this.writeQueryPromise().then(res => {
                response = {
                    done: true,
                    result: res
                };
            }).catch(err =>{
                throw err;
            });
        }catch(e){
            console.error(e);
            this._errno = MySqlManager.QUERY_ERROR;
            response = {
                done: false,
                message: MySqlManager.QUERY_ERROR_MSG
            };
        }
        return response;
    }

    private async writeQueryPromise(): Promise<object>{
        return await new Promise<object>((resolve,reject)=>{
            this._pool.query(this._query,this._values,(err, result, fields)=>{
                if(err){
                    reject(err);
                }   
                resolve({
                    fields: fields,
                    result: result
                });
            });
        });
    }
}

export enum Operations{
    Delete = 'Delete',
    Insert = 'Insert',
    Select = 'Select',
    Update = 'Update'
}