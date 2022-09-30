import { MongoDbModelsManager, MongoDbModelsManagerInterface } from "../mongodbmodelsmanager";

export interface AccountsInterface{

}

export class Accounts extends MongoDbModelsManager{
    
    private _results: Array<object> = new Array<object>(); //Array of Account objects result
    
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
}