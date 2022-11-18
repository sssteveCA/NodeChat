import { PersonalInformationItemsType } from "../../../types/personalinformationitemstype";

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
    get personalInformationItems(){return this._personalInformationItems;}

    public contactInfoButtonClick(): void{
        this._contactInfoButton.on('click',()=>{
            console.log(this._contactInfoButton.attr("class"));
            if(this._contactInfoButton.hasClass("bi-pen")){
                let tel_value: string = this._personalInformationItems.telephone_value_el.text();
                let ea_value: string = this._personalInformationItems.email_value_el.text();
                this._personalInformationItems.telephone_label_el.parent().html(`<label id="telephone_label" class="form-label fw-bold">Numero di telefono</label>`);
                this._personalInformationItems.telephone_value_el.parent().html(`<input type="text" id="telephone_value" class="form-control" value="${tel_value}">`);
                this._personalInformationItems.email_label_el.parent().html(`<label id="email_label" class="form-label fw-bold">Indirizzo email</label>`);
                this._personalInformationItems.email_value_el.parent().html(`<input type="text" id="email_value" class="form-control" value="${ea_value}">`);
            }//if(this._contactInfoButton.hasClass("bi-pen")){
            else if(this._contactInfoButton.hasClass("bi-x-circle-fill")){
                console.log(this._personalInformationItems.telephone_label_el);
                let tel_value: string = this._personalInformationItems.telephone_value_el.val() as string;
                let ea_value: string = this._personalInformationItems.email_value_el.val() as string;
                this._personalInformationItems.telephone_label_el.parent().html(`<span id="telephone_label" class="fw-bold">Numero di telefono</span>`);
                this._personalInformationItems.telephone_value_el.parent().html(`<span id="telephone_value">${tel_value}</span>`);
                this._personalInformationItems.email_label_el.parent().html(`<span id="email_label" class="fw-bold">Indirizzo email</span>`);
                this._personalInformationItems.email_value_el.parent().html(`<span id="email_value">${ea_value}</span>`);
            }//else di if(this._contactInfoButton.hasClass("bi-pen")){
            this._personalInformationItems.telephone_label_el = $('#telephone_label');
            this._personalInformationItems.telephone_value_el = $('#telephone_value');
            this._personalInformationItems.email_label_el = $('#email_label');
            this._personalInformationItems.email_value_el = $('#email_value');
            this._contactInfoButton.toggleClass("btn-success bi-pen");
            this._contactInfoButton.toggleClass("btn-danger bi-x-circle-fill");
        });
    }

    public educationButtonClick(): void{
        this._educationButton.on('click',()=>{
            this._educationButton.toggleClass("btn-success bi-pen");
            this._educationButton.toggleClass("btn-danger bi-x-circle-fill");
        })
    }

    public personalInfoButtonClick(): void{
        this._personalInfoButton.on('click',()=>{
            this._personalInfoButton.toggleClass("btn-success bi-pen");
            this._personalInfoButton.toggleClass("btn-danger bi-x-circle-fill");
            if(this._personalInfoButton.hasClass("bi-x-circle-fill")){

            }//if(this._personalInfoButton.hasClass("bi-x-circle-fill")){
            else if(this._personalInfoButton.hasClass("bi-pen")){

            }//else if(this._personalInfoButton.hasClass("bi-pen")){
        });
    }

    public workButtonClick(): void{
        this._workButton.on('click',()=>{
            this._workButton.toggleClass("btn-success bi-pen");
            this._workButton.toggleClass("btn-danger bi-x-circle-fill");
        });
    }

    
}