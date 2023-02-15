import { AccountSettingsSection, AccountSettingsSectionInterface } from "../../../classes/template/profile/account_settings_section_events.js";

export function setAccountSectionEvents(): void{
    let asseData: AccountSettingsSectionInterface = {
        deleteAccountButton: $('#delete-account-button')
    }
    let asse: AccountSettingsSection = new AccountSettingsSection(asseData);
    asse.deleteAccountButtonClick((response)=>{

    });
}