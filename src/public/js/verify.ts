import { MessageDialog, MessageDialogInterface } from "./classes/dialogs/messagedialog";
import { VerifyRequest, VerifyRequestInterface } from "./classes/requests/verifyrequest";
import { fMessageDialog } from "./functions/general";

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
            fMessageDialog(md_data);

        }//else of if(activation_code != ""){  
    });
});