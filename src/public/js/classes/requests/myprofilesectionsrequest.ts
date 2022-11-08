import { MyProfileSections } from "../../enums/enums";

export interface MyProfileSectionsRequestsInterface {
    section: MyProfileSections
}

export class MyProfileSectionsRequest{
    private _section: MyProfileSections;
    private _errno: number = 0;
    private _error: string|null = null;

    constructor(data: MyProfileSectionsRequestsInterface){
        this._section = data.section;
    }

    public static ERR_FETCH: number = 1;

    public static ERR_FETCH_MSG: string = "Si è verificato un' errore durante l'esecuzione della richiesta";

    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case MyProfileSectionsRequest.ERR_FETCH:
                this._error = MyProfileSectionsRequest.ERR_FETCH_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

}