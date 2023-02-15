import { ConfirmDialog, ConfirmDialogInterface } from "../../../../classes/dialogs/confirmdialog.js";
import { MessageDialogInterface } from "../../../../classes/dialogs/messagedialog.js";
import { EducationUpdateRequest, EducationUpdateRequestInterface } from "../../../../classes/requests/educationupdaterequest.js";
import { SectionEvents } from "../../../../classes/template/profile/section_events.js";
import { fMessageDialog } from "../../../../functions/general.js";
import { Constants } from "../../../../namespaces/constants.js";
import { ProfileSectionEditContainer } from "../../../../types/types.js";

/**
 * Called when the user send the education information update request
 * @param se the SectionEvents instance
 * @param psecData the button clicked and the spinner to show
 */
export default function onEducationButtonClick(se: SectionEvents, psecData: ProfileSectionEditContainer): void{
    let cdData: ConfirmDialogInterface = {
        title: 'Modifica informazioni sull\'istruzione',
        message: 'Vuoi modificare le informazioni sulla tua istruzione con i valori inseriti?'
    };
    let cd: ConfirmDialog = new ConfirmDialog(cdData);
    cd.btYes.on('click',()=>{
        cd.dialog.dialog('destroy');
        cd.dialog.remove();
        let eurData: EducationUpdateRequestInterface = {
            token_key: $('input[name=token_key]').val() as string,
            secondary_school: $('#secondary_school_value').val() as string,
            university: $('#university_value').val() as string
        }
        let eur: EducationUpdateRequest = new EducationUpdateRequest(eurData);
        let eSpinner: JQuery<HTMLDivElement> = $('#'+psecData.spinner_id);
        eSpinner.toggleClass('invisible');
        eur.edUpdate().then(obj => {
            eSpinner.toggleClass('invisible');
            let mdData: MessageDialogInterface = {
                title: "Modifica informazioni sull'istruzione", message: obj[Constants.KEY_MESSAGE]
            }
            fMessageDialog(mdData);
            se.educationButton.trigger("click");
        })
    });
    cd.btNo.on('click',()=>{
        cd.dialog.dialog('destroy');
        cd.dialog.remove();
    }); 
}