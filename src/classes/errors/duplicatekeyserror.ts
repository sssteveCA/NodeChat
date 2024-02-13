
export class DuplicateKeysError extends Error{

    constructor(message: string){
        super(message);
        this.name = "DuplicateKeysError";
    }
}