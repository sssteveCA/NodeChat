
export interface AccountVideosSectionEventsInterface{
    addVideoButton: JQuery<HTMLButtonElement>;
    addVideoInput: JQuery<HTMLInputElement>;
}

export class AccountVideosSectionEvents{
    private _addVideoButton: JQuery<HTMLButtonElement>;
    private _addVideoInput: JQuery<HTMLInputElement>;

    constructor(data: AccountVideosSectionEventsInterface){
        this._addVideoButton = data.addVideoButton;
        this._addVideoInput = data.addVideoInput;
    }

    get addVideoButton(){ return this._addVideoButton; }
    get addVideoInput(){ return this._addVideoInput; }
}