
export class SendEmailError extends Error{

    constructor(message: string){
        super(message);
        this.name = "SendEmailError";
    }
}