import { Email } from "../../classes/email/email";
import { EmailRequest, EmailRequestInterface } from "./classes/request/emailrequest.js";

$(()=>{
    $('#fContacts').on('submit', (ev)=>{
        //User send an email to help center
        ev.preventDefault();
        console.log("submit");
        let er_data: EmailRequestInterface = {
            name: $('#name').val() as string,
            email: $('#email').val() as string,
            subject: $('#subject').val() as string,
            message: $('#message').val() as string
        };
        let er: EmailRequest = new EmailRequest(er_data);
        er.sendEmail().then(obj => {

        });
    });
});
