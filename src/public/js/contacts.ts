import { MessageDialog, MessageDialogInterface } from "./classes/dialogs/messagedialog.js";
import { EmailRequest, EmailRequestInterface } from "./classes/requests/emailrequest.js";
import { Constants } from "./namespaces/constants.js";

$(()=>{
    let spinner = $('#contacts-spinner');
    $('#fContacts').on('submit', (ev)=>{
        //User send an email to help center
        ev.preventDefault();
        spinner.removeClass('d-none');
        let er_data: EmailRequestInterface = {
            name: $('#name').val() as string,
            email: $('#email').val() as string,
            subject: $('#subject').val() as string,
            message: $('#message').val() as string
        };
        let er: EmailRequest = new EmailRequest(er_data);
        er.sendEmail().then(obj => {
            spinner.addClass('d-none');
            let md_data:MessageDialogInterface = {
                title: 'Richiesta assistenza',
                message: obj[Constants.KEY_MESSAGE]
            };
            fMessageDialog(md_data);
        });
    });
});

function fMessageDialog(md_data: MessageDialogInterface){
    let md: MessageDialog = new MessageDialog(md_data);
    md.btOk.on('click',()=>{
        md.dialog.dialog('destroy');
        md.dialog.remove();
    });
}
