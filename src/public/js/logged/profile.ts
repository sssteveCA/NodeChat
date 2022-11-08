import { CurrentUserRequest, CurrentUserRequestInterface } from "../classes/requests/currentuserrequest.js";

$(()=>{
    let cur_data: CurrentUserRequestInterface = {
        token_key: $('input[name=token_key]').val() as string
    };
    console.log(cur_data);
    let cur: CurrentUserRequest = new CurrentUserRequest(cur_data);
    cur.currentUser().then(obj => {
        console.log(obj);
        $('#li-information').trigger('click');
    });
    $('.sections ul li').on('click',(e)=>{
        let fired: JQuery = $(e.target);
        console.log("sections fired");
        let idTarget: string = fired.attr("id") as string;
        console.log(idTarget);
    });
});

enum SectionLiItems{
    ACCOUNT_SETTINGS = "li-account-settings", FRIENDS = "li-friends", INFORMATION = "li-information", PHOTOS = "li-photos", VIDEOS = "li-videos"
}