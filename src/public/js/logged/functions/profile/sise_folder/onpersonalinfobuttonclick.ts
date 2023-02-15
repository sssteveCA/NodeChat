import { ConfirmDialog, ConfirmDialogInterface } from "../../../../classes/dialogs/confirmdialog.js";
import { MessageDialogInterface } from "../../../../classes/dialogs/messagedialog.js";
import { PersonalInformationUpdateRequest, PersonalInformationUpdateRequestInterface } from "../../../../classes/requests/personalinformationupdaterequest.js";
import { SectionEvents } from "../../../../classes/template/profile/section_events.js";
import { fMessageDialog } from "../../../../functions/general.js";
import { Constants } from "../../../../namespaces/constants.js";
import { ProfileSectionEditContainer } from "../../../../types/types.js";

/**
 * Called when the user send the personal information update request
 * @param se the SectionEvents instance
 * @param psecData the button clicked and the spinner to show
 */
export default function onPersonalInfoButtonClick(se: SectionEvents, psecData: ProfileSectionEditContainer): void{
    let cdData: ConfirmDialogInterface = {
        title: 'Modifica informazioni personali',
        message: 'Vuoi modificare le informazioni personali con i valori inseriti?'
    };
    let cd: ConfirmDialog = new ConfirmDialog(cdData);
    cd.btYes.on('click',()=>{
        cd.dialog.dialog('destroy');
        cd.dialog.remove();
        let piurData: PersonalInformationUpdateRequestInterface = {
            token_key: $('input[name=token_key]').val() as string, 
            name: $('#name_value').val() as string,
            surname: $('#surname_value').val() as string,
            sex: $('#sex_value').val() as string,
            birth_date: $('#birth_date_value').val() as string,
            birth_place: $('#birth_place_value').val() as string,
            living_place: $('#living_place_value').val() as string
        };
        let piSpinner: JQuery<HTMLDivElement> = $('#'+psecData.spinner_id);
        piSpinner.toggleClass('invisible');
        let piur: PersonalInformationUpdateRequest = new PersonalInformationUpdateRequest(piurData);
        piur.piUpdate().then(obj => {
            piSpinner.toggleClass('invisible');
            let mdData: MessageDialogInterface = {
                title: "Modifica informazioni personali",
                message: obj[Constants.KEY_MESSAGE]
            }
            fMessageDialog(mdData);
            se.personalInfoButton.trigger("click");
        });  
    });
    cd.btNo.on('click',()=>{
        cd.dialog.dialog('destroy');
        cd.dialog.remove();
    }); 
}