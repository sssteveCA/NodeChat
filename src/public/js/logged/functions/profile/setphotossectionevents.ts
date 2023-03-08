import { AccountPhotosSectionEvents, AccountPhotosSectionEventsInterface } from "../../../classes/template/profile/account_photos_section_events";

export default function setPhotosSectionEvents(): void{
    let apseData: AccountPhotosSectionEventsInterface = {
        addPhotoButton: $('#upload-photo-button'),
        addPhotoInput: $('#upload-photo-input')
    }
    let apse: AccountPhotosSectionEvents = new AccountPhotosSectionEvents(apseData);
    apse.addPhotoButtonClick(response =>{
        console.log(response);
    });
}