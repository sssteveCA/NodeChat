import { EmailRequest } from "./classes/request/emailrequest";

EmailRequest

$(()=>{
    $('#fContacts').on('submit', (ev)=>{
        //User send an email to help center
        ev.preventDefault();
        console.log("submit");
    });
});
