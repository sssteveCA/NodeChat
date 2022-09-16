import { Email, EmailInterface } from "./email";

export interface EmailVerifyInterface{
    username: string;
    email: string;
    email_verify_url: string;
    activation_code: string;
}

export class EmailVerify{
    private _username: string;
    private _email: string;
    private _activation_code: string;
    private _mail_body: string = "";
    private _email_verify_url: string;
    private _full_activation_link: string;
    private _errno: number = 0;
    private _error: string|null = null;

    public static ERR_SENDMAIL:number = 0;

    public static ERR_SENDMAIL_MSG: string = "Errore durante l'invio della mail per la verifica dell'account";

    constructor(data: EmailVerifyInterface){
        this._username = data.username;
        this._email = data.email;
        this._activation_code = data.activation_code;
        this._email_verify_url = data.email_verify_url;
        this._full_activation_link = `${this._email_verify_url}/${this._activation_code}`;
    }

    get username(){return this._username;}
    get email(){return this._email;}
    get activation_code(){return this._activation_code;}
    get mail_body(){return this._mail_body;}
    get full_activation_link(){return this._full_activation_link;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            case EmailVerify.ERR_SENDMAIL:
                this._error = EmailVerify.ERR_SENDMAIL_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    private setHtmlMail(): void{
        this._mail_body = `
<div>
    <div class="thank-you">
        Grazie per esserti iscritto al nostro servizio di chat. <br>
        Per completare l'attivazione clicca su <a href="${this._full_activation_link}">questo link</a>
    </div>
    <div class="otherwise">
        In alternativa puoi incollare questo codice: ${this._activation_code} <br>,
        a <a href="${this._email_verify_url}">questo link</a>
    </div>
    <div class="staff">
        Lo staff di NodeChat
    </div>
</div>
        `;
    }

    public async sendEmailVerify(): Promise<object>{
        let response: object = {};
        this._errno = 0;
        let es_data: EmailInterface = {
            name: this._username,
            email: this._email,
            subject: "Verifica account",
            message: this._mail_body
        };
        let emailSender: Email = new Email(es_data);
        await emailSender.sendMail().then(res => {
            if(res['done'] == true)
                response = {
                    done: true,
                    msg: "La tua richiesta è stata inviata. Riceverai una risposta nel minor tempo possibile"
                };
            else{
                this._errno = EmailVerify.ERR_SENDMAIL;
                response = {
                    done: false,
                    msg: this.error
                };
            }
        }).catch(err => {
            this._errno = EmailVerify.ERR_SENDMAIL;
            response = {
                done: false,
                msg: this.error
            };
        });
        return response;
    }
}