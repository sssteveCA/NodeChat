import nodemailer from 'nodemailer'; 

export interface EmailInterface{
    name: string;
    email: string;
    subject: string;
    message: string;
}

export class Email{
    private _name: string;
    private _email: string;
    private _subject: string;
    private _transport: nodemailer.Transporter;
    private _message: string;

    constructor(data: EmailInterface){
        this.setTransport();
    }

    get name(){return this._name;}
    get email(){return this._email;}
    get subject(){return this._subject;}
    get message(){return this._message;}

    private setTransport(): void{
        this._transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT as unknown as number,
            auth: {
                
            }
        });
    }
    
}