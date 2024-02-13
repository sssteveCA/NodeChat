import { ConfirmDialog, ConfirmDialogInterface } from "../../../../classes/dialogs/confirmdialog";
import { MessageDialogInterface } from "../../../../classes/dialogs/messagedialog";
import { ContactsInformationUpdateRequest, ContactsInformationUpdateRequestInterface } from "../../../../classes/requests/contactsinformationupdaterequest";
import { SectionEvents } from "../../../../classes/template/profile/section_events";
import { fMessageDialog } from "../../../../functions/general";
import { Constants } from "../../../../namespaces/constants";
import { ProfileSectionEditContainer } from "../../../../types/types";


/**
 * Called when the user send the contacts information update request
 * @param se the SectionEvents instance
 * @param psecData the button clicked and the spinner to show
 */
export default function onContactInfoButtonClick(se: SectionEvents, psecData: ProfileSectionEditContainer): void{
    let cdData: ConfirmDialogInterface = {
        title: 'Modifica informazioni di contatto',
        message: 'Vuoi modificare le informazioni di contatto con i valori inseriti?'
    };
    let cd: ConfirmDialog = new ConfirmDialog(cdData);
    cd.btYes.on('click',()=>{
        cd.dialog.dialog('destroy');
        cd.dialog.remove();
        let ciurData: ContactsInformationUpdateRequestInterface = {
            token_key: $('input[name=token_key]').val() as string,
            telephone: $('#telephone_value').val() as string,
            email: $('#email_value').val() as string
        }
        let ciSpinner: JQuery<HTMLDivElement> = $(`#${psecData.spinner_id}
        `);
        ciSpinner.toggleClass('invisible');
        let ciur: ContactsInformationUpdateRequest = new ContactsInformationUpdateRequest(ciurData);
        ciur.ciUpdate().then(obj => {
            ciSpinner.toggleClass('invisible');
            let mdData: MessageDialogInterface = {
                title: 'Modifica informazioni di contatto',
                message: obj[Constants.KEY_MESSAGE]
            }
            fMessageDialog(mdData);
            se.contactInfoButton.trigger("click");
        });
    });
    cd.btNo.on('click',()=>{
        cd.dialog.dialog('destroy');
        cd.dialog.remove();
    }); 
}