export interface ContacstInformationUpdateRequestInterface{
    token_key: string;
    telephone: string;
    email: string;
}

export class ContactsInformationUpdateRequest{
    private _token_key: string;
    private _telephone: string;
    private _email: string;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_FETCH:number = 1;

    private static ERR_FETCH_MSG:string = "Errore durante l'esecuzione della richiesta";

    private static FETCH_URL:string =  "/api/profile/update_contacts_information";

    constructor(data: ContacstInformationUpdateRequestInterface){
        this._token_key = data.token_key;
        this._telephone = data.telephone;
        this._email = data.email;
    }

    get telephone(){return this._telephone;}
    get email(){return this._email;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case ContactsInformationUpdateRequest.ERR_FETCH:
                this._error = ContactsInformationUpdateRequest.ERR_FETCH_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }
}