import { MessageDialog, MessageDialogInterface } from "./messagedialog";

export interface PasswordConfirmDialogInterface extends MessageDialogInterface{

}

export class PasswordConfirmDialog extends MessageDialog{

    private _password: JQuery<HTMLInputElement>;
    private _conf_password: JQuery<HTMLInputElement>;

    constructor(data: PasswordConfirmDialogInterface){
        super(data);
    }

    private setMessageHtml(): string{
        return `
<div class="container">
    <div class="row">
        <div class="col-12">${this._message}</div> 
    </div>
    <div class="row">
        <div class="col-12">
            <label class="form-label">La tua password</label>
            <input type="password" id="pcd-password" class="form-control">
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
            <input type="password" id="pcd-password" class="form-control">
        </div>
    </div>
    <div class="row">
        <input type="checkbox" class="form-check-input" id="pcd-show-password">
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
                click: ()=>{

                }
            }],
            close: ()=>{

            },
            open: ()=>{

            }
        });
        this._btOk = $('body > div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-dialog-buttons > div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix > div > button');
    }

}

