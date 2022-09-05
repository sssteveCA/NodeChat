import { Paths } from "../../../../paths";
import axios from 'axios';

export interface EmailRequestInterface{
    name: string;
    email: string;
    subject: string;
    message: string;
}

export class EmailRequest{
    private _name: string;
    private _email: string;
    private _subject: string;
    private _message: string;
    private _errno: number = 0;
    private _error: string|null = null;

    constructor(data: EmailRequestInterface){
        this.assignValues(data);
    }

    get name(){return this._name;}
    get email(){return this._email;}
    get subject(){return this._subject;}
    get message(){return this._message;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case EmailRequest.ERR_FETCH:
                this._error = EmailRequest.ERR_FETCH_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    public static ERR_FETCH:number = 1;

    private static ERR_FETCH_MSG:string = "Errore durante l'invio della mail";

    private static FETCH_URL:string = Paths.SEND_EMAIL;

    private assignValues(data: EmailRequestInterface): void{
        if(data.name)this._name = data.name;
        else this._name = "";
        if(data.email)this._email = data.email;
        else this._email = "";
        if(data.subject)this._subject = data.subject;
        else this._subject = "";
        if(data.message)this._message = data.message;
        else this._message = "";
    }

    /**
     * Perform the send email request and get the response
     * @returns 
     */
    public async sendEmail(): Promise<object>{
        let response: object = {};
        this._errno = 0;
        try{
            await this.sendEmailPromise().then(res => {
                console.log(res);
                response = JSON.parse(res);
            }).catch(err => {
                throw err;
            });
        }catch(e){
            this._errno = EmailRequest.ERR_FETCH;
            response = {
                done: false,
                msg: this.error
            }
        }
        return response;
    }

    private async sendEmailPromise(): Promise<string>{
        return await new Promise<string>((resolve,reject) => {
            axios.post(EmailRequest.FETCH_URL,{
                name: this._name, email: this._email, subject: this._subject, message: this._message
            },{
                headers: {"Accept": "application/json","Content-Type": "application/json"},
                responseType: "text"
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }

}