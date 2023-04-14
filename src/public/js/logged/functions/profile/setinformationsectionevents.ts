import { SectionEvents, SectionEventsInterface } from "../../../classes/template/profile/section_events";
import { PersonalInformationItemsType } from "../../../types/personalinformationitemstype";
import onContactInfoButtonClick from "./sise_folder/oncontactinfobuttonclick";
import onEducationButtonClick from "./sise_folder/oneducationbuttonclick";
import onPersonalInfoButtonClick from "./sise_folder/onpersonalinfobuttonclick";
import onWorkButtonClick from "./sise_folder/onworkbuttonclick";

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
        onPersonalInfoButtonClick(se,psecData);
    });
    se.educationButtonClick((psecData)=>{
        onEducationButtonClick(se,psecData);
    });
    se.workButtonClick((psecData)=>{
        onWorkButtonClick(se,psecData);
    });
    se.contactInfoButtonClick((psecData)=>{
        onContactInfoButtonClick(se,psecData);
    });
}