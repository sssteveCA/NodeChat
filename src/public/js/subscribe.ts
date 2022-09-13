import { MessageDialog, MessageDialogInterface } from "./classes/dialogs/messagedialog";
import { SubscribeRequest, SubscribeRequestInterface } from "./classes/requests/subscriberequest";

$(()=>{
    $('#bSubscribe').on('click', ()=>{
        let sr_data: SubscribeRequestInterface = {
            username: $('#username').val() as string,
            email: $('#email').val() as string,
            password: $('#password').val() as string,
            confPass: $('#confPass').val() as string
        }
        try{
            let sr: SubscribeRequest = new SubscribeRequest(sr_data);
        }catch(e){
            let md_data: MessageDialogInterface = {
                title: "Registrazione",
                message: e as string
            };
            messageDialog(md_data);
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