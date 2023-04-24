
import mysql from 'mysql2';

export interface MySqlManagerInterface{
     host?: string;
     user?: string;
     password?: string
     database?: string;
     query: string;
     values?: Array<any>;
     connLimit?: number;
     queueLimit?: number;
}

export abstract class MySqlManager{
    private _host: string;
    private _user: string;
    private _database: string;
    private _query: string; //MySQL Query(without field values)
    private _values: Array<any>; //Values for MySQL query
    private _connLimit: number;
    private _queueLimit: number;
    private _pool: mysql.Pool;
    private _errno: number = 0;
    private _error: string|null = null;

    public static QUERY_ERROR: number = 1;

    public static QUERY_ERROR_MSG: string = "Impossibile ottenere i dati dal database;"

    constructor(data: MySqlManagerInterface){
        this.assingValues(data);
        let password: string = '';
        if(data.password)password = data.password;
        else password = process.env.MYSQL_PASSWORD as string;
        this._pool = mysql.createPool({
            host: this._host,
            user: this._user,
            password: password,
            database: this._database,
            waitForConnections: true,
            connectionLimit: this._connLimit,
            queueLimit: this._queueLimit
        });
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
     * Set the class properties
     * @param data 
     */
    private assingValues(data: MySqlManagerInterface): void{
        if(data.host)this._host = data.host;
        else this._host = process.env.MYSQL_HOSTNAME as string;
        if(data.user)this._user = data.user;
        else this._user = process.env.MYSQL_USERNAME as string;
        if(data.database)this._database = data.database;
        else this._database = process.env.MYSQL_DATABASE as string;
        this._query = data.query;
        if(data.values)this._values = data.values;
        else this._values = [];
        if(data.connLimit)this._connLimit = data.connLimit;
        else this._connLimit = 10;
        if(data.queueLimit)this._queueLimit = data.queueLimit;
        else this._queueLimit = 0;
    }

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