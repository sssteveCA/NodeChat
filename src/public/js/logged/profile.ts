import { CurrentUserRequest, CurrentUserRequestInterface } from "../classes/requests/currentuserrequest.js";
import { Section, SectionInterface } from "../classes/template/profile/section.js";
import { SectionEvents, SectionEventsInterface } from "../classes/template/profile/section_events.js";
import { MyProfileSections, SectionLiItems } from "../enums/enums.js";
import Account from "../models/account.js";
import { PersonalInformationItemsType } from "../types/personalinformationitemstype.js";

$(()=>{
    let cur_data: CurrentUserRequestInterface = {
        token_key: $('input[name=token_key]').val() as string
    };
    let account: Account = new Account();
    //console.log(cur_data);
    let cur: CurrentUserRequest = new CurrentUserRequest(cur_data);
    cur.currentUser().then(obj => {
        //console.log(obj);
        if(obj["done"] == true){
            account = setAccount(obj["account"]);
            //console.log(account);
            $('#'+SectionLiItems.INFORMATION).trigger('click');
        }//if(obj["done"] == true){
    });
    $('.sections ul li a').on('click',(e)=>{
        let fired_parent: JQuery = $(e.target).parent();
        let idTarget: string = fired_parent.attr("id") as string;
        let section_data: SectionInterface = {
            account: account, container: 'section-content', section: MyProfileSections.INFORMATION };
        if(idTarget == SectionLiItems.ACCOUNT_SETTINGS){
            section_data = {
                account: account, container: 'section-content', section: MyProfileSections.SETTINGS };
        }
        else if(idTarget == SectionLiItems.FRIENDS){
            section_data = {
                account: account, container: 'section-content', section: MyProfileSections.FRIENDS };
        }
        else if(idTarget == SectionLiItems.INFORMATION){
            section_data = {
                account: account, container: 'section-content', section: MyProfileSections.INFORMATION };
        }
        else if(idTarget == SectionLiItems.PHOTOS){
            section_data = {
                account: account, container: 'section-content', section: MyProfileSections.PHOTOS };
        }
        else if(idTarget == SectionLiItems.VIDEOS){
            section_data = {
                account: account, container: 'section-content', section: MyProfileSections.VIDEOS};
        }
        let section: Section = new Section(section_data);
        if(idTarget == SectionLiItems.INFORMATION){
            setInformationSectionEvents();
        }//
    });
});

function setAccount(obj: object): Account{
    let account: Account = new Account();
    account.email = obj["email"];
    account.name = obj["name"];
    account.surname = obj["surname"];
    account.contacts = obj["contacts"];
    account.education = obj["education"];
    account.employment = obj["employment"];
    account.images = obj["images"];
    account.otherPersonals = obj["otherPersonals"];
    account.videos = obj["videos"];
    return account;
}

function setInformationSectionEvents(): void{
    let piit: PersonalInformationItemsType = {
        name_label_el: $('#name_label'), name_value_el: $('#name_value'), surname_label_el: $('#surname_label'), surname_value_el: $('#surname_value'), sex_label_el: $('#sex_label'), sex_value_el: $('#sex_value'), birth_date_label_el: $('#birth_date_label'), birth_date_value_el: $('#birth_date_value'), birth_place_label_el: $('#birth_place_label'), birth_place_value_el: $('#birth_place_value'), living_place_label_el: $('#living_place_label'), living_place_value_el: $('#living_place_value'), secondary_school_label_el: $('#secondary_school_label'), secondary_school_value_el: $('#secondary_school_value'), university_label_el: $('#university_label'), university_value_el: $('#university_value'), work_label_el: $('#work_label'), work_value_el: $('#work_value'), telephone_label_el: $('#telephone_label'), telephone_value_el: $('#telephone_value'), email_label_el: $('#email_label'), email_value_el: $('#email_value')
    };
    let se_data: SectionEventsInterface = {
        personalInfoButton: $('#bt_personal_info'), educationButton: $('#bt_education'),
        workButton: $('#bt_work'), contactInfoButton: $('#bt_contacts_info'), personalInformationItems: piit
    };
    let se: SectionEvents = new SectionEvents(se_data);
    se.personalInfoButtonClick();
    se.educationButtonClick();
    se.workButtonClick();
    se.contactInfoButtonClick();
}