
export interface EmailVerifyInterface{
    email_verify_url: string;
    activation_code: string;
}

export class EmailVerify{
    private _activation_code: string;
    private _mail_body: string = "";
    private _email_verify_url: string;
    private _full_activation_link: string;

    constructor(data: EmailVerifyInterface){
        this._activation_code = data.activation_code;
        this._email_verify_url = data.email_verify_url;
        this._full_activation_link = `${this._email_verify_url}/${this._activation_code}`;
    }

    get activation_code(){return this._activation_code;}
    get mail_body(){return this._mail_body;}
    get full_activation_link(){return this._full_activation_link;}

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
}