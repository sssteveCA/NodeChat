
export interface AccountPhotosSectionEventsInterface{
    addPhotoButton: JQuery<HTMLButtonElement>;
    addPhotoInput: JQuery<HTMLInputElement>;
}

export class AccountPhotosSectionEvents{
    private _addPhotoButton: JQuery<HTMLButtonElement>;
    private _addPhotoInput: JQuery<HTMLInputElement>;
    
    constructor(data: AccountPhotosSectionEventsInterface){
        this._addPhotoButton = data.addPhotoButton;
        this._addPhotoInput = data.addPhotoInput;
    }

    get addPhotoButton(){ return this._addPhotoButton; }
    get addPhotoInput(){ return this._addPhotoInput; }

    /**
     * Execute the HTTP request to add a new photo
     * @param callback the callback to invoke when a response is returned
     */
    public addPhotoButtonClick(callback: (response: object) => void): void{
        this._addPhotoButton.on('click',()=>{
            this._addPhotoInput.trigger('click');
        });
        this._addPhotoInput.on('change',()=> {
            callback({done: true});
        })
    }
}