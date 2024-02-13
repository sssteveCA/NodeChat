import { PersonalInformationItemsType } from "../../../types/personalinformationitemstype";
import { ProfileSectionEditContainer } from "../../../types/types";

export interface SectionEventsInterface{
    personalInfoButton: JQuery<HTMLButtonElement>;
    educationButton: JQuery<HTMLButtonElement>;
    workButton: JQuery<HTMLButtonElement>;
    contactInfoButton: JQuery<HTMLButtonElement>;
    personalInformationItems: PersonalInformationItemsType;
}

/**
 * This class contains the personal profile events and actions
 */
export class SectionEvents{
    private _personalInfoButton: JQuery<HTMLButtonElement>;
    private _educationButton: JQuery<HTMLButtonElement>;
    private _workButton: JQuery<HTMLButtonElement>;
    private _contactInfoButton: JQuery<HTMLButtonElement>;
    private _editButtonContainer: JQuery<HTMLDivElement>;
    private _personalInformationItems: PersonalInformationItemsType;

    constructor(data: SectionEventsInterface){
        this._personalInfoButton = data.personalInfoButton;
        this._educationButton = data.educationButton;
        this._workButton = data.workButton;
        this._contactInfoButton = data.contactInfoButton;
        this._personalInformationItems = data.personalInformationItems;
    }

    get personalInfoButton(){return this._personalInfoButton;}
    get educationButton(){return this._educationButton;}
    get workButton(){return this._workButton;}
    get contactInfoButton(){return this._contactInfoButton;}
    get editButtonContainer(){return this._editButtonContainer;}
    get personalInformationItems(){return this._personalInformationItems;}

    public contactInfoButtonClick(callback: (psecData: ProfileSectionEditContainer)=> void): void{
        this._contactInfoButton.on('click',()=>{
            if(this._contactInfoButton.hasClass("bi-pen")){
                let tel_value: string = this._personalInformationItems.telephone_value_el.text();
                let ea_value: string = this._personalInformationItems.email_value_el.text();
                this._personalInformationItems.telephone_label_el.parent().html(`<label id="telephone_label" class="form-label fw-bold">Numero di telefono</label>`);
                this._personalInformationItems.telephone_value_el.parent().html(`<input type="text" id="telephone_value" class="form-control" value="${tel_value}">`);
                this._personalInformationItems.email_label_el.parent().html(`<label id="email_label" class="form-label fw-bold">Indirizzo email</label>`);
                this._personalInformationItems.email_value_el.parent().html(`<input type="text" id="email_value" class="form-control" value="${ea_value}">`);
                let ebdData: ProfileSectionEditContainer = { button_id: 'bt_edit_contact_info', spinner_id: 'spinner_edit_contact_info'};
                this.setEditButtonContainer(ebdData);
                this._contactInfoButton.parents(".container").append(this._editButtonContainer);
                $('#'+ebdData.button_id).on('click',()=>{
                    callback(ebdData);
                });
            }//if(this._contactInfoButton.hasClass("bi-pen")){
            else if(this._contactInfoButton.hasClass("bi-x-circle-fill")){
                let tel_value: string = this._personalInformationItems.telephone_value_el.val() as string;
                let ea_value: string = this._personalInformationItems.email_value_el.val() as string;
                this._personalInformationItems.telephone_label_el.parent().html(`<span id="telephone_label" class="fw-bold">Numero di telefono</span>`);
                this._personalInformationItems.telephone_value_el.parent().html(`<span id="telephone_value">${tel_value}</span>`);
                this._personalInformationItems.email_label_el.parent().html(`<span id="email_label" class="fw-bold">Indirizzo email</span>`);
                this._personalInformationItems.email_value_el.parent().html(`<span id="email_value">${ea_value}</span>`);
                this._editButtonContainer.remove();
            }//else di if(this._contactInfoButton.hasClass("bi-pen")){
            this._personalInformationItems.telephone_label_el = $('#telephone_label');
            this._personalInformationItems.telephone_value_el = $('#telephone_value');
            this._personalInformationItems.email_label_el = $('#email_label');
            this._personalInformationItems.email_value_el = $('#email_value');
            this._contactInfoButton.toggleClass("btn-success bi-pen");
            this._contactInfoButton.toggleClass("btn-danger bi-x-circle-fill");
        });
    }

    public educationButtonClick(callback: (psecData: ProfileSectionEditContainer) => void): void{
        this._educationButton.on('click',()=>{
            if(this._educationButton.hasClass("bi-pen")){
                let ss_value: string = this._personalInformationItems.secondary_school_value_el.text();
                let univ_value: string = this._personalInformationItems.university_value_el.text();
                this._personalInformationItems.secondary_school_label_el.parent().html(`<label id="secondary_school_label" class="form-label fw-bold">Scuola superiore</label>`);
                this._personalInformationItems.secondary_school_value_el.parent().html(`<input type="text" id="secondary_school_value" class="form-control" value="${ss_value}">`);
                this._personalInformationItems.university_label_el.parent().html(`<label id="university_label" class="form-label fw-bold">Università</label>`);
                this._personalInformationItems.university_value_el.parent().html(`<input type="text" id="university_value" class="form-control" value="${univ_value}">`);
                let ebdData: ProfileSectionEditContainer = { button_id: 'bt_edit_education', spinner_id: 'spinner_edit_education'};
                this.setEditButtonContainer(ebdData);
                this._educationButton.parents(".container").append(this._editButtonContainer);
                $('#'+ebdData.button_id).on('click',()=>{
                    callback(ebdData);
                });
            }//if(this._contactInfoButton.hasClass("bi-pen")){
            else if(this._educationButton.hasClass("bi-x-circle-fill")){
                let ss_value: string = this._personalInformationItems.secondary_school_value_el.val() as string;
                let univ_value: string = this._personalInformationItems.university_value_el.val() as string;
                this._personalInformationItems.secondary_school_label_el.parent().html(`<span id="secondary_school_label" class="fw-bold">Scuola superiore</span>`);
                this._personalInformationItems.secondary_school_value_el.parent().html(`<span id="secondary_school_value">${ss_value}</span>`);
                this._personalInformationItems.university_label_el.parent().html(`<span id="university_label" class="fw-bold">Università</span>`);
                this._personalInformationItems.university_value_el.parent().html(`<span id="university_value">${univ_value}</span>`);
                this._editButtonContainer.remove();
            }//else di if(this._contactInfoButton.hasClass("bi-pen")){
            this._personalInformationItems.secondary_school_label_el = $('#secondary_school_label');
            this._personalInformationItems.secondary_school_value_el = $('#secondary_school_value');
            this._personalInformationItems.university_label_el = $('#university_label');
            this._personalInformationItems.university_value_el = $('#university_value');
            this._educationButton.toggleClass("btn-success bi-pen");
            this._educationButton.toggleClass("btn-danger bi-x-circle-fill");
        })
    }

    public personalInfoButtonClick(callback: (psecData: ProfileSectionEditContainer)=> void): void{
        this._personalInfoButton.on('click',()=>{
            if(this._personalInfoButton.hasClass("bi-pen")){
                let nm_value: string = this._personalInformationItems.name_value_el.text();
                let snm_value: string = this._personalInformationItems.surname_value_el.text();
                let sex_value: string = this._personalInformationItems.sex_value_el.text();
                let bd_value: string = this._personalInformationItems.birth_date_value_el.text();
                let bp_value: string = this._personalInformationItems.birth_place_value_el.text();
                let lp_value: string = this._personalInformationItems.living_place_value_el.text();
                this._personalInformationItems.name_label_el.parent().html(`<label id="name_label" class="form-label fw-bold">Il tuo nome</label>`);
                this._personalInformationItems.name_value_el.parent().html(`<input type="text" id="name_value" class="form-control" value="${nm_value}">`);
                this._personalInformationItems.surname_label_el.parent().html(`<label id="surname_label" class="form-label fw-bold">Il tuo cognome</label>`);
                this._personalInformationItems.surname_value_el.parent().html(`<input type="text" id="surname_value" class="form-control" value="${snm_value}">`);
                this._personalInformationItems.sex_label_el.parent().html(`<label id="sex_label" class="form-label fw-bold">Sesso</label>`);
                this._personalInformationItems.sex_value_el.parent().html(`<input type="text" id="sex_value" class="form-control" value="${sex_value}">`);
                this._personalInformationItems.birth_date_label_el.parent().html(`<label id="birth_date_label" class="form-label fw-bold">Data di nascita</label>`);
                this._personalInformationItems.birth_date_value_el.parent().html(`<input type="text" id="birth_date_value" class="form-control" value="${bd_value}">`);
                this._personalInformationItems.birth_place_label_el.parent().html(`<label id="birth_place_label" class="form-label fw-bold">Luogo di nascita</label>`);
                this._personalInformationItems.birth_place_value_el.parent().html(`<input type="text" id="birth_place_value" class="form-control" value="${bp_value}">`);
                this._personalInformationItems.living_place_label_el.parent().html(`<label id="living_place_label" class="form-label fw-bold">Luogo di residenza</label>`);
                this._personalInformationItems.living_place_value_el.parent().html(`<input type="text" id="living_place_value" class="form-control" value="${lp_value}">`);
                let ebdData: ProfileSectionEditContainer = { 
                    button_id: 'bt_edit_personal_info', spinner_id: 'spinner_edit_personal_info'
                };
                this.setEditButtonContainer(ebdData);
                this._personalInfoButton.parents(".container").append(this._editButtonContainer);
                $('#'+ebdData.button_id).on('click',()=>{
                    callback(ebdData);
                });
            }//if(this._contactInfoButton.hasClass("bi-pen")){
            else if(this._personalInfoButton.hasClass("bi-x-circle-fill")){
                let nm_value: string = this._personalInformationItems.name_value_el.val() as string;
                let snm_value: string = this._personalInformationItems.surname_value_el.val() as string;
                let sex_value: string = this._personalInformationItems.sex_value_el.val() as string;
                let bd_value: string = this._personalInformationItems.birth_date_value_el.val() as string;
                let bp_value: string = this._personalInformationItems.birth_place_value_el.val() as string;
                let lp_value: string = this._personalInformationItems.living_place_value_el.val() as string;
                this._personalInformationItems.name_label_el.parent().html(`<span id="name_label" class="fw-bold">Il tuo nome</span>`);
                this._personalInformationItems.name_value_el.parent().html(`<span id="name_value">${nm_value}</span>`);
                this._personalInformationItems.surname_label_el.parent().html(`<span id="surname_label" class="fw-bold">Il tuo cognome</span>`);
                this._personalInformationItems.surname_value_el.parent().html(`<span id="surname_value">${snm_value}</span>`);
                this._personalInformationItems.sex_label_el.parent().html(`<span id="sex_label" class="fw-bold">Sesso</span>`);
                this._personalInformationItems.sex_value_el.parent().html(`<span id="sex_value">${sex_value}</span>`);
                this._personalInformationItems.birth_date_label_el.parent().html(`<span id="birth_date_label" class="fw-bold">Data di nascita</span>`);
                this._personalInformationItems.birth_date_value_el.parent().html(`<span id="birth_date_value">${bd_value}</span>`);
                this._personalInformationItems.birth_place_label_el.parent().html(`<span id="birth_place_label" class="fw-bold">Luogo di nascita</span>`);
                this._personalInformationItems.birth_place_value_el.parent().html(`<span id="birth_place_value">${bp_value}</span>`);
                this._personalInformationItems.living_place_label_el.parent().html(`<span id="living_place_label" class="fw-bold">Luogo di residenza</span>`);
                this._personalInformationItems.living_place_value_el.parent().html(`<span id="living_place_value">${lp_value}</span>`);
                this._editButtonContainer.remove();
            }//else di if(this._contactInfoButton.hasClass("bi-pen")){
            this._personalInformationItems.name_label_el = $('#name_label');
            this._personalInformationItems.name_value_el = $('#name_value');
            this._personalInformationItems.surname_label_el = $('#surname_label');
            this._personalInformationItems.surname_value_el = $('#surname_value');
            this._personalInformationItems.sex_label_el = $('#sex_label');
            this._personalInformationItems.sex_value_el = $('#sex_value');
            this._personalInformationItems.birth_date_label_el = $('#birth_date_label');
            this._personalInformationItems.birth_date_value_el = $('#birth_date_value');
            this._personalInformationItems.birth_place_label_el = $('#birth_place_label');
            this._personalInformationItems.birth_place_value_el = $('#birth_place_value');
            this._personalInformationItems.living_place_label_el = $('#living_place_label');
            this._personalInformationItems.living_place_value_el = $('#living_place_value');
            this._personalInfoButton.toggleClass("btn-success bi-pen");
            this._personalInfoButton.toggleClass("btn-danger bi-x-circle-fill");
        });
    }

    public workButtonClick(callback: (psecData: ProfileSectionEditContainer)=> void): void{
        this._workButton.on('click',()=>{
            if(this._workButton.hasClass("bi-pen")){
                let wk_value: string = this._personalInformationItems.work_value_el.text();
                this._personalInformationItems.work_label_el.parent().html(`<label id="work_label" class="form-label fw-bold">Lavoro attuale</label>`);
                this._personalInformationItems.work_value_el.parent().html(`<input type="text" id="work_value" class="form-control" value="${wk_value}">`);
                let ebdData: ProfileSectionEditContainer = { 
                    button_id: 'bt_edit_work', spinner_id: 'spinner_edit_work'
                };
                this.setEditButtonContainer(ebdData);
                this._workButton.parents(".container").append(this._editButtonContainer);
                $('#'+ebdData.button_id).on('click',()=>{
                    callback(ebdData);
                });
            }//if(this._workButton.hasClass("bi-pen")){
            else if(this._workButton.hasClass("bi-x-circle-fill")){
                let wk_value: string = this._personalInformationItems.work_value_el.val() as string;
                this._personalInformationItems.work_label_el.parent().html(`<span id="work_label" class="fw-bold">Lavoro attuale</span>`);
                this._personalInformationItems.work_value_el.parent().html(`<span id="work_value">${wk_value}</span>`);
                this._editButtonContainer.remove();
            }//else if(this._workButton.hasClass("bi-x-circle-fill")){
            this._personalInformationItems.work_label_el = $('#work_label');
            this._personalInformationItems.work_value_el = $('#work_value');
            this._workButton.toggleClass("btn-success bi-pen");
            this._workButton.toggleClass("btn-danger bi-x-circle-fill");
        });
    }

    /**
     * Add the edit button and the spinner to the template
     * @param params 
     */
    private setEditButtonContainer(params: ProfileSectionEditContainer): void{
        this._editButtonContainer = $('<div>');
        this._editButtonContainer.addClass("row");
        this._editButtonContainer.html(`
<div class="col-6 col-md-4 col-lg-3 offset-3 offset-md-4 offset-lg-5 d-flex align-items-center">
    <button type="button" id="${params.button_id}" class="btn btn-primary">MODIFICA</button>
    <div id="${params.spinner_id}" class="ms-2 spinner-border invisible" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
</div>`);
    }

    
}