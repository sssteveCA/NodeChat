import mysql from 'mysql2';

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
    }

    get host(){return this._host;}
    get user(){return this._user;}
    get database(){return this._database;}
    get query(){return this._query;}
    get values(){return this._values;}
    get connLimit(){return this._connLimit;}
    get queueLimit(){return this._queueLimit;}

    public async writeQuery(): Promise<object>{
        let response: object = {};
        await this._pool.query(this._query,this._values,(err, result, fields)=>{
            if(err){
                console.log(err);
                response = {
                    done: false,
                    message: err.message
                };
            }
            else{
                response = {
                    done: true,
                    message: result.toString()
                }
            }
        });
        return response;
    }
}

export enum Operations{
    Delete = 'Delete',
    Insert = 'Insert',
    Select = 'Select',
    Update = 'Update'
}