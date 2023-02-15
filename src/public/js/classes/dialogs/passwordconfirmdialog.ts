import { MessageDialog, MessageDialogInterface } from "./messagedialog";

export interface PasswordConfirmDialogInterface extends MessageDialogInterface{

}

export class PasswordConfirmDialog extends MessageDialog{

    constructor(data: PasswordConfirmDialogInterface){
        super(data);
    }

    protected setDialog(): void {
        let message = this._message;
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

