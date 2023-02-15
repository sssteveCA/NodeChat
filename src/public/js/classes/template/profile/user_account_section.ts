
export interface UserAccountSectionInterface{
    deleteAccountButton: JQuery<HTMLButtonElement>;
}

export class UserAccountSection{
    private _deleteAccountButton: JQuery<HTMLButtonElement>;

    constructor(data: UserAccountSectionInterface){
        this._deleteAccountButton = data.deleteAccountButton;
    }

    get deleteAccountButton(){return this._deleteAccountButton;}
}

