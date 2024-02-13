export interface MessageDialogInterface{
    title: string,
    message: string,
    id?: string,
    width?: number|string,
    height?: number|string
}

export class MessageDialog{
    protected _title: string;
    protected _message: string;
    protected _id: string;
    protected _width: number|string;
    protected _height: number|string;
    protected _dialog: JQuery<HTMLDivElement>;
    protected _btOk: JQuery<HTMLButtonElement>;

    constructor(data: MessageDialogInterface){
        this._title = data.title;
        this._message = data.message;
        if(data.hasOwnProperty('id'))
            this._id = data.id as string;
        else this._id = 'dialog';
        if(data.hasOwnProperty('width'))
            this._width = data.width as number;
        else this._width = 'auto';
        if(data.hasOwnProperty('height'))
            this._height = data.height as number;
        else this._height = 'auto';
        this.setDialog();
    }

    get title(){return this._title;}
    get message(){return this._message;}
    get id(){return this._id;}
    get width(){return this._width;}
    get height(){return this._height;}
    get dialog(){return this._dialog;}
    get btOk(){return this._btOk;}

    protected setDialog(): void{
        let message = this._message;
        this._dialog = $('<div>');
        this._dialog.attr('id',this._id);
        this._dialog.appendTo($('body'));
        this._dialog.dialog({
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
                }
            ],
            close: function(){
            },
            open: function(){
                $(this).html(message);
            }
        });
        this._btOk = $('body > div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-dialog-buttons > div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix > div > button');
    }
}