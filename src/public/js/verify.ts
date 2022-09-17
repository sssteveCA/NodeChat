import { MessageDialog, MessageDialogInterface } from "./classes/dialogs/messagedialog.js";
import { VerifyRequest, VerifyRequestInterface } from "./classes/requests/verifyrequest.js";

$(()=>{
    $('#fVerify').on('submit',(e)=>{
        e.preventDefault();
        let activation_code: string = $('#activation_code').val() as string;
        if(activation_code != ""){
            let vr_data: VerifyRequestInterface = {
                activation_code: activation_code
            };
            let vr: VerifyRequest = new VerifyRequest(vr_data);
        }//if(activation_code != ""){
        else{
            let md_data: MessageDialogInterface = {
                title: "Attivazione account",
                message: "Inserisci un codice di attivazione"
            };
            messageDialog(md_data);

        }//else of if(activation_code != ""){  
    });
});

function messageDialog(md_data: MessageDialogInterface){
    let md: MessageDialog = new MessageDialog(md_data);
    md.btOk.on('click', ()=>{
        md.dialog.dialog('destroy');
        md.dialog.remove();
    });
}