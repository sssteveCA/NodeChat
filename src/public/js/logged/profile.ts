import { CurrentUserRequest, CurrentUserRequestInterface } from "../classes/requests/currentuserrequest";
import { Section, SectionInterface } from "../classes/template/profile/section";
import { MyProfileSections, SectionLiItems } from "../enums/enums";
import Account from "../models/account";
import { Constants } from "../namespaces/constants";
import { addImages } from "./functions/profile/addimages";
import { setAccountSectionEvents } from "./functions/profile/setaccountsectionevents";
import { setInformationSectionEvents } from "./functions/profile/setinformationsectionevents";
import setPhotosSectionEvents from "./functions/profile/setphotossectionevents";

$(()=>{
    let cur_data: CurrentUserRequestInterface = {
        token_key: $('input[name=token_key]').val() as string
    };
    let account: Account = new Account();
    let cur: CurrentUserRequest = new CurrentUserRequest(cur_data);
    cur.currentUser().then(obj => {
        if(obj[Constants.KEY_DONE] == true){
            account = setAccount(obj["account"]);
            addImages(account["images"]["profileImage"], account["images"]["coverImage"]);
            $('#'+SectionLiItems.INFORMATION+' a').trigger('click');
        }//if(obj[Constants.KEY_DONE] == true){
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
        else if(idTarget == SectionLiItems.PHOTOS){
            setPhotosSectionEvents();
        }
        else if(idTarget == SectionLiItems.ACCOUNT_SETTINGS){
            setAccountSectionEvents();
        }
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
