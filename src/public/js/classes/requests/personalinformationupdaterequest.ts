import { resolve } from "path";

export interface PersonalInformationUpdateRequestInterface {
    token_key: string;
    name: string;
    surname: string;
    sex: string;
    birth_date: string;
    birth_place: string;
    living_place: string;
}

export class PersonalInformationUpdateRequest{
    private _token_key: string;
    private _name: string;
    private _surname: string;
    private _sex: string;
    private _birth_date: string;
    private _birth_place: string;
    private _living_place: string;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_FETCH:number = 1;

    private static ERR_FETCH_MSG:string = "Errore durante l'esecuzione della richiesta";

    private static FETCH_URL:string =  "/";

    constructor(data: PersonalInformationUpdateRequestInterface){
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
            case PersonalInformationUpdateRequest.ERR_FETCH:
                this._error = PersonalInformationUpdateRequest.ERR_FETCH_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    private assignValues(data: PersonalInformationUpdateRequestInterface): void{
        this._token_key = data.token_key;
        this._name = data.name;
        this._surname = data.surname;
        this._sex = data.sex;
        this._birth_date = data.birth_date;
        this._birth_place = data.birth_place;
        this._living_place = data.living_place;
    }

    public async piUpdate(): Promise<object>{
        let response: object = {};
        this._errno = 0;
        try{
            await this.piUpdatePromise().then(res => {
                console.log(res);
                response = JSON.parse(res);
            }).catch(err => {
                console.warn(err);
                throw err;
            });
        }catch(e){
            this._errno = PersonalInformationUpdateRequest.ERR_FETCH;
            response = {
                done: false, msg: this.error
            }
        }
        return response;
    }

    private async piUpdatePromise(): Promise<string>{
        let body: object = {
            token_key: this._token_key, name: this._name, surname: this._surname, sex: this._sex, birth_date: this._birth_date, birth_place: this._birth_place, living_place: this._living_place
        }
        return await new Promise<string>((resolve,reject)=>{
            fetch(PersonalInformationUpdateRequest.FETCH_URL, {
                method: 'POST',
                headers: {
                    "Accept": "application/json", "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => {
                resolve(res.text());
            }).catch(err => {
                reject(err);
            });
        });
    }
}