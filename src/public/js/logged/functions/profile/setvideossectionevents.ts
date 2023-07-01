import { AccountPhotosSectionEvents } from "../../../classes/template/profile/account_photos_section_events";
import { AccountVideosSectionEvents, AccountVideosSectionEventsInterface } from "../../../classes/template/profile/account_videos_section_events";

export default function setVideosSectionEvents(): void{
    let avseData: AccountVideosSectionEventsInterface = {
        addVideoButton: $('#upload-video-button'),
        addVideoInput: $('#upload-video-input')
    }
    let avse: AccountVideosSectionEvents = new AccountVideosSectionEvents(avseData)
    avse.getVideos(response => {
        
    })

}