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
    html: string;
}

export class Email{
    private _name: string;
    private _email: string;
    private _subject: string;
    private _transport: nodemailer.Transporter;
    private _message: string;
    private _message_object: MessageInterface;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_SEND:number = 1;

    private static ERR_SEND_MSG:string = "Errore durante l'invio della mail";

    constructor(data: EmailInterface){
        this.assignValues(data);
        this.setTransport();
        this.setMessage();
    }

    get name(){return this._name;}
    get email(){return this._email;}
    get subject(){return this._subject;}
    get message(){return this._message;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case Email.ERR_SEND:
                this._error = Email.ERR_SEND_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    /**
     * Assign the entry data to class properties 
     * @param data 
     */
    private assignValues(data: EmailInterface){
        this._name = data.name;
        this._email = data.email;
        this._subject = data.subject;
        this._message = data.message;
    }

    /**
     * Set the nodemailer transporter
     */
    private setTransport(): void{
        this._transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT as unknown as number,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            }
        });
    }

    /**
     * Set the nodemailer message object
     */
    private setMessage(): void{
        this._message_object = {
            from: process.env.EMAIL_ADMIN as string,
            to: this._email,
            subject: this._subject,
            html: this._message
        };
        
    }

    public async sendMail(): Promise<object>{
        let response: object = {};
        this._errno = 0;
        try{
            await this._transport.sendMail(this._message_object).then(res => {
                //console.log(res);
                response = {
                    done: true,
                };
            }).catch(err => {
                console.warn(err);
                throw err;
            });
        }catch(e){
            console.warn(e);
            this._errno = Email.ERR_SEND;
            response = {
                done: false,
            };
        }
        return response;
    }
    
}