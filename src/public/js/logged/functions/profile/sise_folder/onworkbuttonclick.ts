import { ConfirmDialog, ConfirmDialogInterface } from "../../../../classes/dialogs/confirmdialog";
import { MessageDialogInterface } from "../../../../classes/dialogs/messagedialog";
import { EmploymentUpdateRequest, EmploymentUpdateRequestInterface } from "../../../../classes/requests/employmentupdaterequest";
import { SectionEvents } from "../../../../classes/template/profile/section_events";
import { fMessageDialog } from "../../../../functions/general";
import { Constants } from "../../../../namespaces/constants";
import { ProfileSectionEditContainer } from "../../../../types/types";

/**
 * Called when the user send the work information update request
 * @param se the SectionEvents instance
 * @param psecData the button clicked and the spinner to show
 */
export default function onWorkButtonClick(se: SectionEvents, psecData: ProfileSectionEditContainer): void{
    let cdData: ConfirmDialogInterface = {
        title: 'Modifica informazioni sul lavoro',
        message: 'Vuoi modificare le informazioni sul lavoro con i valori inseriti?'
    };
    let cd: ConfirmDialog = new ConfirmDialog(cdData);
    cd.btYes.on('click',()=>{
        cd.dialog.dialog('destroy');
        cd.dialog.remove();
        let empData: EmploymentUpdateRequestInterface = {
            token_key: $('input[name=token_key]').val() as string,
            employment: $('#work_value').val() as string
        }
        let emp: EmploymentUpdateRequest = new EmploymentUpdateRequest(empData);
        let empSpinner: JQuery<HTMLDivElement> = $('#'+psecData.spinner_id);
        empSpinner.toggleClass('invisible');
        emp.employmentUpdate().then(obj => {
            empSpinner.toggleClass('invisible');
            let mdData: MessageDialogInterface = {
                title: 'Modifica informazioni sul lavoro',
                message: obj[Constants.KEY_MESSAGE]
            }
            fMessageDialog(mdData);
            se.workButton.trigger("click");
        });
    });
    cd.btNo.on('click',()=>{
        cd.dialog.dialog('destroy');
        cd.dialog.remove();
    }); 
}