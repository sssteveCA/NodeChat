import { ConfirmDialog, ConfirmDialogInterface } from "./classes/dialogs/confirmdialog.js";

$(()=>{
    console.log("menu.js");
    let logout_link:JQuery = $('#logout');
    if(logout_link.length){
        //If logout_link exists
        logout_link.on("click",(e)=>{
            e.preventDefault();
            let cd_data: ConfirmDialogInterface = {
                title: "Esci dalla sessione",
                message: "Sei sicuro di voler chiudere la sessione?"
            };
            let cd: ConfirmDialog = new ConfirmDialog(cd_data);
            cd.btYes.on('click',()=>{
                cd.dialog.dialog('destroy');
                cd.dialog.remove();
                window.location.href = "/logout";
            });
            cd.btNo.on('click', ()=>{
                cd.dialog.dialog('destroy');
                cd.dialog.remove();
            });
        });
    }//if(logout_link.length){
});