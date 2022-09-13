import { Date } from "mongoose";
import { MongoDbModelManager, MongoDbModelManagerInterface } from "../mongodbmodelmanager";

export class Account extends MongoDbModelManager{

    private _username:string;
    private _email:string;
    private _password_hash: string;
    private _creationDate: Date;
    private _activationCode: string;
    private _resetCode: string;
    private _verified: boolean;
    private _resetted: boolean;

    constructor(data_parent: MongoDbModelManagerInterface){
        super(data_parent);
    }

    get username(){return this._username;}
    get email(){return this._email;}
    get password_hash(){return this._password_hash;}
    get creationDate(){return this._creationDate;}
    get activationCode(){return this._activationCode;}
    get resetCode(){return this._resetCode;}
    get verified(){return this._verified;}
    get resetted(){return this._resetted;}

    public async deleteAccount(filter: object): Promise<object>{
        let response: object = {};
        await super.delete(filter).then(res => {
            console.log(res);
        }).catch(err => {
            console.warn(err);
        });
        return response;
    }

    public async getAccount(filter: object): Promise<object>{
        let response: object = {};
        await super.get(filter).then(res => {
            console.log(res);
        }).catch(err => {
            console.warn(err);
        });
        return response;
    }

    public async insertAccount(document: object): Promise<object>{
        let response: object = {};
        await super.insert(document).then(res => {
            console.log(res);
        }).catch(err => {
            console.warn(err);
        });
        return response;
    }

    public async updateAccount(filter: object, set: object): Promise<object>{
        let response: object = {};
        await super.update(filter,set).then(res => {
            console.log(res);
        }).catch(err => {
            console.warn(err);
        });
        return response;
    }
}