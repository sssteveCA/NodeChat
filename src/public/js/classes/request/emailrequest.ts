
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

    constructor(data: EmailRequestInterface){

    }

    get name(){return this._name;}
    get email(){return this._email;}
    get subject(){return this._subject;}
    get message(){return this._message;}
}