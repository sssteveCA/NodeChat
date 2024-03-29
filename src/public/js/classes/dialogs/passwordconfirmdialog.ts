import { MessageDialog, MessageDialogInterface } from "./messagedialog";

export interface PasswordConfirmDialogInterface extends MessageDialogInterface{

}

export class PasswordConfirmDialog extends MessageDialog{

    private _password: JQuery<HTMLInputElement>;
    private _conf_password: JQuery<HTMLInputElement>;
    private _show_password: JQuery<HTMLInputElement>;

    get password(){ return this._password; }
    get conf_password(){ return this._conf_password; }

    constructor(data: PasswordConfirmDialogInterface){
        super(data);
        this.setDialogEvents();
    }

    private setMessageHtml(): string{
        return `
<div class="container">
    <div class="row">
        <div class="col-12">${this._message}</div> 
    </div>
    <div class="row mt-4">
        <div class="col-12">
            <label class="form-label">La tua password</label>
        </div>
        <div class="col-12">
            <input type="password" id="pcd-password" class="form-control">
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <label class="form-label">Conferma password</label>
        </div>
        <div class="col-12">
            <input type="password" id="pcd-conf-password" class="form-control">
        </div>
    </div>
    <div class="row mt-2">
        <div class="col-12">
            <input type="checkbox" class="form-check-input" id="pcd-show-password">
            <label for="pcd-show-password">Mostra password</label>
        </div>
        
    </div>
</div>
            
        `;
    }

    protected setDialog(): void {
        let message = this.setMessageHtml();
        this._dialog = $('<div>');
        this._dialog.attr('id',this._id);
        this.dialog.appendTo($('body'));
        this.dialog.dialog({
            closeOnEscape: false,
            draggable: false,
            height: this._height,
            modal: true,
            resizable: false,
            title: this._title,
            width: this._width,
            buttons: [{
                text: 'OK',
                click: function(){

                }
            }],
            close: function(){},
            open: function(){
                $(this).html(message);
            }
        });
        this._password = $('#pcd-password');
        this._conf_password = $('#pcd-conf-password');
        this._show_password = $('#pcd-show-password');
        this._btOk = $('body > div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-dialog-buttons > div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix > div > button');
    }

    private setDialogEvents(): void{
       this._show_password.on('change',(e)=>{
        if($(e.currentTarget).is(':checked')){
            this._password.attr('type','text');
            this._conf_password.attr('type','text');
        }
        else{
            this._password.attr('type','password');
            this._conf_password.attr('type','password');
        }
       })  
    }

}

