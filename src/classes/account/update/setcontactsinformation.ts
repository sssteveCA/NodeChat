import { Schemas } from "../../../namespaces/schemas";
import { Account } from "../../database/models/account";
import { MongoDbModelManagerInterface } from "../../database/mongodbmodelmanager";

export interface SetContactsInformationInterface{
    token_key: string;
    telephone: string;
    email: string;
}

export class SetContactsInformation{
    private _token_key: string;
    private _telephone: string;
    private _email: string;
    private _errno: number = 0;
    private _error: string|null = null;

    private static ERR_ACCOUNT_ID:number = 1;
    private static ERR_UPDATE:number = 2;

    private static ERR_ACCOUNT_ID_MSG:string = "L'id dell'account non è stato trovato";
    private static ERR_UPDATE_MSG:string = "Errore durante l'aggiornamento delle informazioni di contatto";

    constructor(data: SetContactsInformationInterface){
        this._token_key = data.token_key;
        this._telephone = data.telephone;
        this._email = data.email;
    }

    get telephone(){return this._telephone;}
    get email(){return this._email;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case SetContactsInformation.ERR_ACCOUNT_ID:
                this._error = SetContactsInformation.ERR_ACCOUNT_ID_MSG;
                break;
            case SetContactsInformation.ERR_UPDATE:
                this._error = SetContactsInformation.ERR_UPDATE_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    /**
     * Update the user document that matches the _id with accountId
     * @param accountId the id of the document to update
     * @returns true if the operation was done successfully, false otherwise
     */
    private async updateCi(accountId: string): Promise<boolean>{
        let updated: boolean = false;
        let mmiData: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string,
            schema: Schemas.ACCOUNTS
        }
        let account: Account = new Account(mmiData,{});
        await account.updateAccount(
            {_id: accountId},
            {"contacts.email": this._email,
             "contacts.phone": this._telephone}
        ).then(res => updated = res["done"]);
        return updated;
    }
}