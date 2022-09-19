
export class AccountNotActivatedError extends Error{

    constructor(message: string){
        super(message);
        this.name = "AccountNotActivatedError";
    }
}