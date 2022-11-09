import { CurrentUserRequest, CurrentUserRequestInterface } from "../classes/requests/currentuserrequest.js";
import { Section, SectionInterface } from "../classes/template/profile/section.js";
import { MyProfileSections, SectionLiItems } from "../enums/enums.js";
import Account from "../models/account.js";

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
    $('.sections ul li').on('click',(e)=>{
        let fired: JQuery = $(e.target);
        let idTarget: string = fired.attr("id") as string;
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
    });
});

function setAccount(obj: object): Account{
    let account: Account = new Account();
    account.email = obj["email"];
    account.name = obj["name"];
    account.surname = obj["surname"];
    return account;
}