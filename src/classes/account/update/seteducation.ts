import { Schemas } from "../../../namespaces/schemas";
import { Account } from "../../database/models/account";
import { MongoDbModelManagerInterface } from "../../database/mongodbmodelmanager";
import { General } from "../../general";

export interface SetEducationInterface{
    token_key: string;
    secondary_school: string;
    university: string;
}

export class SetEducation{
    private _token_key: string;
    private _secondary_school: string;
    private _university: string;
    private _errno: number = 0;
    private _error: string|null = null;

    private static ERR_ACCOUNT_ID:number = 1;
    private static ERR_UPDATE:number = 2;

    private static ERR_ACCOUNT_ID_MSG:string = "L'id dell'account non è stato trovato";
    private static ERR_UPDATE_MSG:string = "Errore durante l'aggiornamento delle informazioni sull'istruzione";

    constructor(data: SetEducationInterface){
        this._secondary_school = data.secondary_school;
        this._university = data.university;
    }

    get secondary_school(){return this._secondary_school;}
    get university(){return this._university;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case SetEducation.ERR_ACCOUNT_ID:
                this._error = SetEducation.ERR_ACCOUNT_ID_MSG;
                break;
            case SetEducation.ERR_UPDATE:
                this._error = SetEducation.ERR_UPDATE_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    public async setEducation(): Promise<object>{
        this._errno = 0;
        let accountId: string|null = await General.getAccountId(this._token_key);
        if(accountId != null){
            let updated: boolean = await this.updateEducation(accountId);
            if(updated) return {done: true};
            this._errno = SetEducation.ERR_UPDATE;
            return {done: false};
        }//if(accountId != null){
        this._errno = SetEducation.ERR_ACCOUNT_ID;
        return {done: false};
    }

    /**
     * Update the user document that matches the _id wuth accountId
     * @param accountId the id of the document to update
     * @returns true if the operation was done successfully, false otherwise
     */
    private async updateEducation(accountId: string): Promise<boolean> {
        let updated: boolean = false;
        this._errno = 0;
        let mmiData: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string,
            schema: Schemas.ACCOUNTS
        }
        let account: Account = new Account(mmiData,{});
        await account.updateAccount({_id: accountId},
            {"education.secondary": this._secondary_school, 
            "education.university": this._university}).then( res => updated = res["done"] );
        return updated;
    }
}