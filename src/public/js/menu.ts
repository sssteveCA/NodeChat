import { ConfirmDialog, ConfirmDialogInterface } from "./classes/dialogs/confirmdialog.js";

$(()=>{
    logout();
    policy_menu_item();
});

function logout(): void{
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
}

function policy_menu_item(): void{
    $('.policy-menu').on('mouseenter',(e)=>{
        let pos = $(e.currentTarget).position();
        let height: number = $(e.currentTarget).height() as number;
        $('.policy-sub-menu').css({
            position: 'absolute',
            top: (pos.top + height)+'px',
            left: pos.left+'px',
            display: 'flex',
            'z-index': 20
        });
    });
    $('.policy-menu').on('mouseleave',(e)=>{
        $('.policy-sub-menu').css({
            display: 'none'
        })
    });
}