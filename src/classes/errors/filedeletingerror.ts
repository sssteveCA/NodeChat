
export default class FileDeletingError extends Error{
    
    constructor(message: string){
        super(message)
        this.name = "FileDeletingError"
    }
}