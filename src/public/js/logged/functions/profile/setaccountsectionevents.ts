import { MessageDialog, MessageDialogInterface } from "../../../classes/dialogs/messagedialog";
import { AccountSettingsSection, AccountSettingsSectionInterface } from "../../../classes/template/profile/account_settings_section_events";
import { Constants } from "../../../namespaces/constants";

export function setAccountSectionEvents(): void{
    let asseData: AccountSettingsSectionInterface = {
        deleteAccountButton: $('#delete-account-button')
    }
    let asse: AccountSettingsSection = new AccountSettingsSection(asseData);
    asse.deleteAccountButtonClick((response)=>{
        let mdData: MessageDialogInterface = {
            title: 'Elimina account',
            message: response[Constants.KEY_MESSAGE]
        }
        let md: MessageDialog = new MessageDialog(mdData);
        md.btOk.on('click',()=> {
            md.dialog.dialog('destroy');
            md.dialog.remove();
            if(response[Constants.KEY_DONE] == true){
                window.location.href = "/";
            }
        })
    });
}