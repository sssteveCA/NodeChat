import { Schemas } from "../../../namespaces/schemas";
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
            default:
                this._error = null;
                break;
        }
        return this._error;
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
}