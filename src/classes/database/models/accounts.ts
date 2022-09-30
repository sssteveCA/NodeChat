import { Schemas } from "../../../namespaces/schemas";
import { DatabaseConnectionError } from "../../errors/databaseconnectionerror";
import { General } from "../../general";
import { MongoDbModelManagerInterface } from "../mongodbmodelmanager";
import { MongoDbModelsManager, MongoDbModelsManagerInterface } from "../mongodbmodelsmanager";
import { Account, AccountInterface } from "./account";

export interface AccountsInterface{

}

export class Accounts extends MongoDbModelsManager{
    
    private _results: Account[]; //Array of Account objects result
    
    //Errors
    public static DUPLICATEKEYS_ERROR:number = 50;
    public static MISSINGDATA_ERROR: number = 51;

    public static DUPLICATEKEYS_ERROR_MSG:string = "Esiste già un account con questo nome o con questo indirizzo email";
    private static MISSINGDATA_ERROR_MSG: string = "Uno o più dati richiesti sono mancanti";

    constructor(data_parent: MongoDbModelsManagerInterface, data: AccountsInterface){
        super(data_parent);
    }

    get results(){return this._results;}
    get error(){
        if(this._errno < 50){
            return super.error;
        }
        switch(this._errno){
            case Accounts.DUPLICATEKEYS_ERROR:
                this._error = Accounts.DUPLICATEKEYS_ERROR_MSG;
                break;
            case Accounts.MISSINGDATA_ERROR:
                this._error = Accounts.MISSINGDATA_ERROR_MSG;
                break;
        }
        return this._error;
    }

    /**
     * Delete all the accounts from the collection that match with a filter
     * @param filter the filter to search the documents to delete
     * @returns 
     */
    public async deleteAccounts(filter: object): Promise<object>{
        this._errno = 0;
        let response: object = {};
        await super.connect().then(conn => {
            if(conn == true) return super.delete(filter);
            else throw new DatabaseConnectionError(this.error as string);
        }).then(res => {
            //console.log(res);
        }).catch(err => {
            console.warn(err);
        }).finally(()=>{
            super.close();
        });
        return response;
    }

    /**
     * Get the accounts from the collection that match with a filter
     * @param filter the filter to search the documents to get
     * @returns 
     */
    public async getAccounts(filter: object): Promise<object>{
        this._errno = 0;
        this._results = [];
        let response: object = {
            result: []
        };
        await super.connect().then(conn => {
            if(conn == true)return super.get(filter);
            else throw new DatabaseConnectionError(this.error as string);     
        }).then(res => {
            console.log("getAccounts");
            console.log(res);
            response['done'] = true;
            //Check if results is a non empty an Array of objects
            if(Array.isArray(res) && res.length > 0){
                let mmi_data: MongoDbModelManagerInterface = {
                    collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string,
                    schema: Schemas.ACCOUNTS
                };
                res.forEach(acc => {
                    let acc_data: AccountInterface = {
                        id: acc['id'], username: acc['username'], email: acc['email'],
                        creationDate: acc['creationDate'], activationCode: acc['activationCode'],
                        resetCode: acc['resetCode'], verified: acc['verified'], resetted: acc['resetted']
                    };
                    let account: Account = new Account(mmi_data,acc_data);
                    this._results.push(account);
                });
                response['result'] = this._results;
            }//if(Array.isArray(res) && res.length > 0 ){
        }).catch(err => {
            console.warn(err);
            response = {
                done: false,
                msg: this.error
            };
        }).finally(()=>{
            super.close();
        });
        return response;
    }

    /**
     * Add multiple accounts to the collection
     * @returns 
     */
    public async insertAccounts(accounts: Account[]): Promise<object>{
        this._errno = 0;
        let response: object = {};
        try{
            
        }catch(e){

        }
        return response;
    }

    private prepareInsert(accounts: Account[]):void{
        accounts.forEach((acc, index, accounts_array) =>{
            let current_date: Date = new Date();
            let curr_date_str: string = General.dateString(current_date);
            accounts_array[index].creationDate = curr_date_str;
        });
    }


}