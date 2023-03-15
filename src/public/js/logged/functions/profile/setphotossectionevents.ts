import { MessageDialogInterface } from "../../../classes/dialogs/messagedialog.js";
import { AccountPhotosSectionEvents, AccountPhotosSectionEventsInterface } from "../../../classes/template/profile/account_photos_section_events.js";
import { fMessageDialog } from "../../../functions/general.js";
import { Constants } from "../../../namespaces/constants.js";

export default function setPhotosSectionEvents(): void{
    let apseData: AccountPhotosSectionEventsInterface = {
        addPhotoButton: $('#upload-photo-button'),
        addPhotoInput: $('#upload-photo-input')
    }
    let apse: AccountPhotosSectionEvents = new AccountPhotosSectionEvents(apseData);
    apse.getPhotos(response => {
        let pl_row: JQuery<HTMLDivElement> = $('#photos-list').find('.row') as JQuery<HTMLDivElement>;
        response['result'].forEach(photo => {
            let img: string = `
<div class="user-image col-12 col-sm-6 col-md-4 col-lg-3">
    <img src="${photo['path']}" alt="" title="">
</div>           
            `;
        })
    });
    apse.addPhotoButtonClick(response =>{
        let mdData: MessageDialogInterface = {
            title: "Nuova foto", message: response[Constants.KEY_MESSAGE]
        }
        fMessageDialog(mdData);
    });
}