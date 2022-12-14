import { CurrentUserRequest, CurrentUserRequestInterface } from "../classes/requests/currentuserrequest.js";
import { UserRequest, UserRequestInterface } from "../classes/requests/userrequest.js";
import { Section, SectionInterface } from "../classes/template/profile/section.js";
import { UserSection, UserSectionInterface } from "../classes/template/profile/user_section.js";
import { MyProfileSections, SectionLiItems } from "../enums/enums.js";
import Account from "../models/account.js";

$(()=>{
    let ur_data: UserRequestInterface = {
        token_key: $('input[name=token_key]').val() as string,
        user_id: $('input[name=user_id]').val() as string
    };
    let account: Account = new Account();
    //console.log(cur_data);
    let ur: UserRequest = new UserRequest(ur_data);
    ur.userInfo().then(obj => {
        //console.log(obj);
        if(obj["done"] == true){
            account = setAccount(obj["account"]);
            addImages(account["images"]["profileImage"], account["images"]["coverImage"]);
            //console.log(account);
            $('#'+SectionLiItems.INFORMATION+' a').trigger('click');
        }//if(obj["done"] == true){
    });
    $('.sections ul li a').on('click',(e)=>{
        let fired_parent: JQuery = $(e.target).parent();
        let idTarget: string = fired_parent.attr("id") as string;
        let section_data: UserSectionInterface = {
            account: account, container: 'section-content', section: MyProfileSections.INFORMATION };
        if(idTarget == SectionLiItems.FRIENDS){
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
        let section: UserSection = new UserSection(section_data);
    });
});

function addImages(profile: string, cover: string): void{
    $('.profile-image').html(`<img src="${profile}" alt="Immagine del profilo" title="Immagine del profilo">`);
    $('.cover-image').html(`<img src="${cover}" alt="Immagine di copertina" title="Immagine di copertina">`);
}

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