import { CurrentUserRequest, CurrentUserRequestInterface } from "../classes/requests/currentuserrequest.js";
import { Section, SectionInterface } from "../classes/template/profile/section.js";
import { MyProfileSections } from "../enums/enums.js";

$(()=>{
    let cur_data: CurrentUserRequestInterface = {
        token_key: $('input[name=token_key]').val() as string
    };
    //console.log(cur_data);
    let cur: CurrentUserRequest = new CurrentUserRequest(cur_data);
    cur.currentUser().then(obj => {
        console.log(obj);
        $('#'+SectionLiItems.INFORMATION).trigger('click');
    });
    $('.sections ul li').on('click',(e)=>{
        let fired: JQuery = $(e.target);
        let idTarget: string = fired.attr("id") as string;
        console.log(idTarget);
        let section_data: SectionInterface = {
            account: {}, container: 'section-content', section: MyProfileSections.INFORMATION };
        if(idTarget == SectionLiItems.ACCOUNT_SETTINGS){
            section_data = {
                account: {}, container: 'section-content', section: MyProfileSections.SETTINGS };
        }
        else if(idTarget == SectionLiItems.FRIENDS){
            section_data = {
                account: {}, container: 'section-content', section: MyProfileSections.FRIENDS };
        }
        else if(idTarget == SectionLiItems.INFORMATION){
            section_data = {
                account: {}, container: 'section-content', section: MyProfileSections.INFORMATION };
        }
        else if(idTarget == SectionLiItems.PHOTOS){
            section_data = {
                account: {}, container: 'section-content', section: MyProfileSections.PHOTOS };
        }
        else if(idTarget == SectionLiItems.VIDEOS){
            section_data = {
                account: {}, container: 'section-content', section: MyProfileSections.VIDEOS};
        }
        let section: Section = new Section(section_data);
    });
});

enum SectionLiItems{
    ACCOUNT_SETTINGS = "li-account-settings", FRIENDS = "li-friends", INFORMATION = "li-information", PHOTOS = "li-photos", VIDEOS = "li-videos"
}