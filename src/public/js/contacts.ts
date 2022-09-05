import { Email, EmailInterface } from "../../classes/email/email";
import $ from "jquery";

$(()=>{
    console.log("contacts");
    $('#fContacts').on('submit', (ev)=>{
        //User send an email to help center
        ev.preventDefault();
        console.log("submit");
    });
});
