import { MessageDialogInterface } from "./classes/dialogs/messagedialog";
import { SubscribeRequest, SubscribeRequestInterface } from "./classes/requests/subscriberequest";
import { fMessageDialog } from "./functions/general";
import { Constants } from "./namespaces/constants";

$(()=>{
    let spinner = $('#subscribe-spinner');
    $('#bSubscribe').on('click', (e)=>{
        e.preventDefault();
        let sr_data: SubscribeRequestInterface = {
            name: $('#name').val() as string,
            surname: $('#surname').val() as string,
            username: $('#username').val() as string,
            email: $('#email').val() as string,
            password: $('#password').val() as string,
            confPass: $('#confPass').val() as string
        }
        try{
            let sr: SubscribeRequest = new SubscribeRequest(sr_data);
            spinner.removeClass("d-none");
            sr.subscribe().then(obj => {
                spinner.addClass("d-none");
                let md_data: MessageDialogInterface = {
                    title: "Registrazione",
                    message: obj[Constants.KEY_MESSAGE]
                };
                fMessageDialog(md_data);
            }).catch(err => {
                let md_data: MessageDialogInterface = {
                    title: "Registrazione",
                    message: err.message 
                };
                fMessageDialog(md_data);
            });
        }catch(e){
            if(e instanceof Error){
                let md_data: MessageDialogInterface = {
                    title: "Registrazione",
                    message: e.message as string
                };
                fMessageDialog(md_data);
            }   
        }
    });//$('#bSubscribe').on('click', (e)=>{
    $('#showPass').on('change',(e)=>{
        let this_checkbox = $(e.target);
        if(this_checkbox.is(":checked")){
            $('#password').attr('type','text');
            $('#confPass').attr('type','text');
        }
        else{
            $('#password').attr('type','password');
            $('#confPass').attr('type','password');
        }
    });
});
