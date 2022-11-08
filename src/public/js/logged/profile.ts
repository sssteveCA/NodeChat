import { CurrentUserRequest, CurrentUserRequestInterface } from "../classes/requests/currentuserrequest.js";

$(()=>{
    let cur_data: CurrentUserRequestInterface = {
        token_key: $('input[name=token_key]').val() as string
    };
    console.log(cur_data);
    let cur: CurrentUserRequest = new CurrentUserRequest(cur_data);
    cur.currentUser().then(obj => {
        console.log(obj);
    });
});