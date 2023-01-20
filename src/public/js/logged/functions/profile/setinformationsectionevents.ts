import { ConfirmDialog, ConfirmDialogInterface } from "../../../classes/dialogs/confirmdialog.js";
import { MessageDialogInterface } from "../../../classes/dialogs/messagedialog.js";
import { ContactsInformationUpdateRequest, ContactsInformationUpdateRequestInterface } from "../../../classes/requests/contactsinformationupdaterequest.js";
import { EducationUpdateRequest, EducationUpdateRequestInterface } from "../../../classes/requests/educationupdaterequest.js";
import { EmploymentUpdateRequest, EmploymentUpdateRequestInterface } from "../../../classes/requests/employmentupdaterequest.js";
import { PersonalInformationUpdateRequest, PersonalInformationUpdateRequestInterface } from "../../../classes/requests/personalinformationupdaterequest.js";
import { SectionEvents, SectionEventsInterface } from "../../../classes/template/profile/section_events.js";
import { fMessageDialog } from "../../../functions/general.js";
import { PersonalInformationItemsType } from "../../../types/personalinformationitemstype.js";

export function setInformationSectionEvents(): void{
    let piit: PersonalInformationItemsType = {
        name_label_el: $('#name_label'), name_value_el: $('#name_value'), surname_label_el: $('#surname_label'), surname_value_el: $('#surname_value'), sex_label_el: $('#sex_label'), sex_value_el: $('#sex_value'), birth_date_label_el: $('#birth_date_label'), birth_date_value_el: $('#birth_date_value'), birth_place_label_el: $('#birth_place_label'), birth_place_value_el: $('#birth_place_value'), living_place_label_el: $('#living_place_label'), living_place_value_el: $('#living_place_value'), secondary_school_label_el: $('#secondary_school_label'), secondary_school_value_el: $('#secondary_school_value'), university_label_el: $('#university_label'), university_value_el: $('#university_value'), work_label_el: $('#work_label'), work_value_el: $('#work_value'), telephone_label_el: $('#telephone_label'), telephone_value_el: $('#telephone_value'), email_label_el: $('#email_label'), email_value_el: $('#email_value')
    };
    let se_data: SectionEventsInterface = {
        personalInfoButton: $('#bt_personal_info'), educationButton: $('#bt_education'),
        workButton: $('#bt_work'), contactInfoButton: $('#bt_contacts_info'), personalInformationItems: piit
    };
    let se: SectionEvents = new SectionEvents(se_data);
    se.personalInfoButtonClick((psecData)=>{
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
                    message: obj["msg"]
                }
                fMessageDialog(mdData);
                se.personalInfoButton.trigger("click");
            });  
        });
        cd.btNo.on('click',()=>{
            cd.dialog.dialog('destroy');
            cd.dialog.remove();
        }); 
    });
    se.educationButtonClick((psecData)=>{
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
                    title: "Modifica informazioni sull'istruzione", message: obj["msg"]
                }
                fMessageDialog(mdData);
                se.educationButton.trigger("click");
            })
        });
        cd.btNo.on('click',()=>{
            cd.dialog.dialog('destroy');
            cd.dialog.remove();
        }); 
    });
    se.workButtonClick((psecData)=>{
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
                    message: obj["msg"]
                }
                fMessageDialog(mdData);
                se.workButton.trigger("click");
            });
        });
        cd.btNo.on('click',()=>{
            cd.dialog.dialog('destroy');
            cd.dialog.remove();
        }); 
    });
    se.contactInfoButtonClick((psecData)=>{
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
                    message: obj["msg"]
                }
                fMessageDialog(mdData);
                se.contactInfoButton.trigger("click");
            });
        });
        cd.btNo.on('click',()=>{
            cd.dialog.dialog('destroy');
            cd.dialog.remove();
        }); 
    });
}