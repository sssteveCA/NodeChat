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
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_SEND:number = 1;

    private static ERR_SEND_MSG:string = "Errore durante l'invio della mail";

    constructor(data: EmailInterface){
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
     * Set the nodemailer transporter
     */
    private setTransport(): void{
        console.log("setTransport");
        this._transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT as unknown as number,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            }
        });
        console.log(this._transport);
    }

    /**
     * Set the nodemailer message object
     */
    private setMessage(): void{
        console.log("setMessage");
        this._message_object = {
            from: this._email,
            to: process.env.EMAIL_ADMIN as string,
            subject: this._subject,
            text: this._message
        };
    }

    public async sendMail(): Promise<object>{
        console.log("sendMail");
        let response: object = {};
        this._errno = 0;
        try{
            await this._transport.sendMail(this._message_object).then(res => {
                console.log("sendMail response");
                console.log(res);
                response = {
                    done: true,
                    msg: "La tua richiesta è stata inviata. Riceverai una risposta nel minor tempo possibile"
                };
            }).catch(err => {
                console.warn(err);
                throw err;
            });
        }catch(e){
            console.log("sendMail catch");
            console.warn(e);
            this._errno = Email.ERR_SEND;
            response = {
                done: false,
                msg: this.error
            };
        }
        return response;
    }
    
}