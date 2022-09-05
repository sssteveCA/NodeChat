import { MessageDialog, MessageDialogInterface } from "./classes/dialogs/messagedialog.js";
import { EmailRequest, EmailRequestInterface } from "./classes/request/emailrequest.js";

$(()=>{
    $('#fContacts').on('submit', (ev)=>{
        //User send an email to help center
        ev.preventDefault();
        let er_data: EmailRequestInterface = {
            name: $('#name').val() as string,
            email: $('#email').val() as string,
            subject: $('#subject').val() as string,
            message: $('#message').val() as string
        };
        let er: EmailRequest = new EmailRequest(er_data);
        er.sendEmail().then(obj => {
            let md_data:MessageDialogInterface = {
                title: 'Richiesta assistenza',
                message: obj['msg']
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
