import nodemailer from 'nodemailer'; 

export interface EmailInterface{
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface MessageInterface{
    from: string;
    to: string;
    subject: string;
    text: string;
}

export class Email{
    private _name: string;
    private _email: string;
    private _subject: string;
    private _transport: nodemailer.Transporter;
    private _message: string;
    private _message_object: MessageInterface;

    constructor(data: EmailInterface){
        this.setTransport();
        this.setMessage();
    }

    get name(){return this._name;}
    get email(){return this._email;}
    get subject(){return this._subject;}
    get message(){return this._message;}

    /**
     * Set the nodemailer transporter
     */
    private setTransport(): void{
        this._transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT as unknown as number,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    /**
     * Set the nodemailer message object
     */
    private setMessage(): void{
        this._message_object = {
            from: this._email,
            to: process.env.EMAIL_USERNAME as string,
            subject: this._subject,
            text: this._message
        };
    }

    
    
}