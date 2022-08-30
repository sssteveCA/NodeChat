import mysql from 'mysql2';

export interface MySqlManagerInterface{
     host: string;
     user: string;
     password: string
     database: string;
}

export class MySqlManager{
    private _host: string;
    private _user: string;
    private _database: string;

    constructor(data: MySqlManagerInterface){
        this._host = data.host;
        this._user = data.user;
        this._database = data.database;
    }

    get host(){return this._host;}
    get user(){return this._user;}
    get database(){return this._database;}
}

export enum Operations{
    Delete = 'Delete',
    Insert = 'Insert',
    Select = 'Select',
    Update = 'Update'
}