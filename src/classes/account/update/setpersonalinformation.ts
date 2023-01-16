import { threadId } from "worker_threads";
import { Schemas } from "../../../namespaces/schemas";
import { Account, AccountInterface } from "../../database/models/account";
import { Token, TokenInterface } from "../../database/models/token";
import { MongoDbModelManagerInterface } from "../../database/mongodbmodelmanager";

export interface SetPersonalInformationInterface {
    token_key: string;
    name: string;
    surname: string;
    sex: string;
    birth_date: string;
    birth_place: string;
    living_place: string;
}

/**
 * Update the personal information of the logged user in DB
 */
export class SetPersonalInformation{
    private _token_key: string;
    private _name: string;
    private _surname: string;
    private _sex: string;
    private _birth_date: string;
    private _birth_place: string;
    private _living_place: string;
    private _errno: number = 0;
    private _error: string|null = null;

    private static ERR_ACCOUNT_ID:number = 1;
    private static ERR_UPDATE:number = 2;

    private static ERR_ACCOUNT_ID_MSG:string = "L'id dell'account non è stato trovato";
    private static ERR_UPDATE_MSG:string = "Errore durante l'aggiornamento delle informazioni personali";

    constructor(data: SetPersonalInformationInterface){
        this.assignValues(data);
    }

    get name(){return this._name;}
    get surname(){return this._surname;}
    get sex(){return this._sex;}
    get birth_date(){return this._birth_date;}
    get birth_place(){return this._birth_place;}
    get living_place(){return this._living_place;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case SetPersonalInformation.ERR_ACCOUNT_ID:
                this._error = SetPersonalInformation.ERR_ACCOUNT_ID_MSG;
                break;
            case SetPersonalInformation.ERR_UPDATE:
                this._error = SetPersonalInformation.ERR_UPDATE_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }


    /**
     * Update the personal information of the logged user
     * @returns 
     */
    public async setPersonalInformation(): Promise<object> {
        this._errno = 0;
        let accountId: string|null = await this.getAccountId();
        if(accountId != null){
            let updated: boolean = await this.updatePi(accountId);
            if(updated) return {done: true};
            this._errno = SetPersonalInformation.ERR_UPDATE;
            return {done: false};
        }//if(accountId != null){
        this._errno = SetPersonalInformation.ERR_ACCOUNT_ID;
        return {done: false};
    }

    private assignValues(data: SetPersonalInformationInterface): void{
        this._token_key = data.token_key;
        this._name = data.name;
        this._surname = data.surname;
        this._sex = data.sex;
        this._birth_date = data.birth_date;
        this._birth_place = data.birth_place;
        this._living_place = data.living_place;
    }

    /**
     * Get the id of the user associated with the provided token key
     * @returns 
     */
    private async getAccountId(): Promise<string|null>{
        let accountId: string|null = null;
        let mmiData: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_TOKENS_COLLECTION as string,
            schema: Schemas.TOKENS
        }
        let tokenData: TokenInterface = {
            tokenKey: this._token_key
        }
        let token: Token = new Token(mmiData,tokenData);
        await token.getToken({tokenKey: token.tokenKey})
            .then(res =>  accountId = token.accountId );
        return accountId;
    }

    /**
     * Update the user document that matches the _id wuth accountId
     * @param accountId the id of the document to update
     * @returns true if the operation was done successfully, false otherwise
     */
    private async updatePi(accountId: string): Promise<boolean> {
        let updated: boolean = false;
        let mmiData: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string,
            schema: Schemas.ACCOUNTS
        }
        let account: Account = new Account(mmiData,{});
        let lpArray: string[] = this._living_place.split(",");
        await account.updateAccount(
            {_id: accountId},
            {
                name: this._name, surname: this._surname, "otherPersonals.sex": this._sex,
                "otherPersonals.birthDate": this._birth_date, "otherPersonals.birthPlace": this._birth_place, "otherPersonals.residence.address": lpArray[0], "otherPersonals.residence.number": lpArray[1], "otherPersonals.residence.city": lpArray[2]
            }).then(res => updated = res["done"] );
        return updated;
    }
}