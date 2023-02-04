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
    let policy_sub_menu: JQuery<HTMLUListElement> =  $('.policy-sub-menu');
    let policy_menu: JQuery<HTMLUListElement> = $('.policy-menu');
    let psm_css = {};
    policy_menu.on('mouseenter',(e)=>{
        let pos = $(e.currentTarget).position();
        let pm_height: number = $(e.currentTarget).height() as number;
        let pm_width: number = policy_menu.width() as number;
        let psm_width: number = policy_sub_menu.width() as number;
        let half_width_diff = (psm_width - pm_width) / 2;
        psm_css = {
            position: 'absolute',
            top: (pos.top + pm_height)+'px',
            left: (pos.left - half_width_diff)+'px',
            display: 'flex',
            'z-index': 20,
        }
        policy_sub_menu.css(psm_css);

    });
    policy_menu.on('mouseleave',(e)=>{
        policy_sub_menu.css({
            display: 'none'
        })
    });
    policy_sub_menu.on('mouseenter',(e)=>{
        $(e.currentTarget).css(psm_css)
    });
    policy_sub_menu.on('mouseleave',(e)=>{
        $(e.currentTarget).css({
            display: 'none'
        })
    })
}