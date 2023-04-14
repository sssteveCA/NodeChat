import { MessageDialogInterface } from "../../../classes/dialogs/messagedialog";
import { AccountPhotosSectionEvents, AccountPhotosSectionEventsInterface } from "../../../classes/template/profile/account_photos_section_events";
import { fMessageDialog } from "../../../functions/general";
import { Constants } from "../../../namespaces/constants";

export default function setPhotosSectionEvents(): void{
    let apseData: AccountPhotosSectionEventsInterface = {
        addPhotoButton: $('#upload-photo-button'),
        addPhotoInput: $('#upload-photo-input')
    }
    let apse: AccountPhotosSectionEvents = new AccountPhotosSectionEvents(apseData);
    apse.getPhotos(response => {
        let pl_row: JQuery<HTMLDivElement> = $('#photos-list').find('.row') as JQuery<HTMLDivElement>;
        pl_row.html("");
        let row_content: string = "";
        response['result'].forEach(photo => {
            let img: string = `
<div class="user-image col-12 col-sm-6 col-md-4 col-lg-3">
    <img src="${photo['_path']}" alt="" title="">
</div>           
            `;
            row_content += img;
        })
        pl_row.append(row_content);
    });
    apse.addPhotoButtonClick(response =>{
        let mdData: MessageDialogInterface = {
            title: "Nuova foto", message: response[Constants.KEY_MESSAGE]
        }
        fMessageDialog(mdData);
    });
}