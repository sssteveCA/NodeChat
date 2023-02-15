import { ConfirmDialog, ConfirmDialogInterface } from "../../dialogs/confirmdialog";

export interface AccountSettingsSectionInterface{
    deleteAccountButton: JQuery<HTMLButtonElement>;
}

/**
 * This class contains the personal account settings events and actions
 */
export class AccountSettingsSection{
    private _deleteAccountButton: JQuery<HTMLButtonElement>;

    constructor(data: AccountSettingsSectionInterface){
        this._deleteAccountButton = data.deleteAccountButton;
    }

    get deleteAccountButton(){return this._deleteAccountButton;}

    /**
     * Execute the HTTP request to delete the account permanently
     * @param callback the callback to invoke when a response is returned
     */
    public deleteAccountButtonClick(callback: (response: object)=> void): void{
        this._deleteAccountButton.on('click',()=>{
            let cdData: ConfirmDialogInterface = {
                title: 'Elimina account',
                message: 'Sei sicuro di voler eliminare definitivamente il tuo account?'
            }
            let cd: ConfirmDialog = new ConfirmDialog(cdData);
            cd.btYes.on('click',()=>{
                cd.dialog.dialog('destroy');
                cd.dialog.remove();
            });
            cd.btNo.on('click',()=>{
                cd.dialog.dialog('destroy');
                cd.dialog.remove();
            });
        });
    }
}

