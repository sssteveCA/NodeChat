
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
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    private assignValues(data: EmailRequestInterface){
        if(data.name)this._name = data.name;
        else this._name = "";
        if(data.email)this._email = data.email;
        else this._email = "";
        if(data.subject)this._subject = data.subject;
        else this._subject = "";
        if(data.message)this._message = data.message;
        else this._message = "";
    }
}