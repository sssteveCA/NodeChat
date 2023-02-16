import { MessageDialog, MessageDialogInterface } from "../../../classes/dialogs/messagedialog.js";
import { AccountSettingsSection, AccountSettingsSectionInterface } from "../../../classes/template/profile/account_settings_section_events.js";
import { fMessageDialog } from "../../../functions/general.js";
import { Constants } from "../../../namespaces/constants.js";

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
                
            }
        })
    });
}