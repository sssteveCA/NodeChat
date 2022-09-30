import { MessageDialog, MessageDialogInterface } from "../classes/dialogs/messagedialog.js";

export function fMessageDialog(md_data: MessageDialogInterface): void{
    let md: MessageDialog = new MessageDialog(md_data);
    md.btOk.on('click',()=>{
        md.dialog.dialog('destroy');
        md.dialog.remove();
    });
}