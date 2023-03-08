
export interface AccountPhotosSectionEventsInterface{
    addPhotoButton: JQuery<HTMLButtonElement>;
}

export class AccountPhotosSectionEvents{
    private _addPhotoButton: JQuery<HTMLButtonElement>;
    
    constructor(data: AccountPhotosSectionEventsInterface){
        this._addPhotoButton = data.addPhotoButton;
    }

    
}