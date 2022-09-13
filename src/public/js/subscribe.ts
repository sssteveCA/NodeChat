import { MessageDialog, MessageDialogInterface } from "./classes/dialogs/messagedialog.js";
import { SubscribeRequest, SubscribeRequestInterface } from "./classes/requests/subscriberequest.js";

$(()=>{
    $('#bSubscribe').on('click', (e)=>{
        e.preventDefault();
        let sr_data: SubscribeRequestInterface = {
            username: $('#username').val() as string,
            email: $('#email').val() as string,
            password: $('#password').val() as string,
            confPass: $('#confPass').val() as string
        }
        try{
            let sr: SubscribeRequest = new SubscribeRequest(sr_data);
            sr.subscribe().then(obj => {

            }).catch(err => {

            });
        }catch(e){
            if(e instanceof Error){
                let md_data: MessageDialogInterface = {
                    title: "Registrazione",
                    message: e.message as string
                };
                messageDialog(md_data);
            }
            
        }
    });
});

function messageDialog(md_data: MessageDialogInterface){
    let md: MessageDialog = new MessageDialog(md_data);
    md.btOk.on('click', ()=>{
        md.dialog.dialog('destroy');
        md.dialog.remove();
    });
}