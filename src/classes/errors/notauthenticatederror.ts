
export class NotAuthenticatedError extends Error{

    constructor(message: string){
        super(message);
        this.name = "NotAuthenticatedError";
    }
}