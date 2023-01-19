import { Schemas } from "../../../namespaces/schemas";
import { Account } from "../../database/models/account";
import { MongoDbModelManagerInterface } from "../../database/mongodbmodelmanager";
import { General } from "../../general";

export interface SetEmploymentInterface{
    token_key: string;
    employment: string;
}

export class SetEmployment{
    private _token_key: string;
    private _employment: string;
    private _errno: number = 0;
    private _error: string|null = null;

    private static ERR_ACCOUNT_ID:number = 1;
    private static ERR_UPDATE:number = 2;

    private static ERR_ACCOUNT_ID_MSG:string = "L'id dell'account non è stato trovato";
    private static ERR_UPDATE_MSG:string = "Errore durante l'aggiornamento delle informazioni sul lavoro";

    constructor(data: SetEmploymentInterface){
        this._token_key = data.token_key;
        this._employment = data.employment;
    }

    get token_key(){return this._token_key;}
    get employment(){return this._employment;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case SetEmployment.ERR_ACCOUNT_ID:
                this._error = SetEmployment.ERR_ACCOUNT_ID_MSG;
                break;
            case SetEmployment.ERR_UPDATE:
                this._error = SetEmployment.ERR_UPDATE_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    /**
     * Update the employment information of the logged user
     * @returns 
     */
    public async setEmployment(): Promise<object>{
        this._errno = 0;
        let accountId: string|null = await General.getAccountId(this._token_key);
        if(accountId != null){
            let updated: boolean = await this.updateEmployment(accountId);
            if(updated) return {done: true};
            this._errno = SetEmployment.ERR_UPDATE;
            return {done: false};
        }//if(accountId != null){
        this._errno = SetEmployment.ERR_ACCOUNT_ID;
        return {done: false};
    }

    /**
     * Update the user document that matches the _id with accountId
     * @param accountId the id of the document to update
     * @returns true if the operation was done successfully, false otherwise
     */
    private async updateEmployment(accountId: string): Promise<boolean>{
        let updated: boolean = false;
        let mmiData: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string,
            schema: Schemas.ACCOUNTS
        }
        let account: Account = new Account(mmiData,{});
        await account.updateAccount(
            {_id: accountId},
            {
                employment: this._employment
            }).then(res => updated = res["done"]);
        return updated;
    }
}