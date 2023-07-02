import { AccountPhotosSectionEvents } from "../../../classes/template/profile/account_photos_section_events";
import { AccountVideosSectionEvents, AccountVideosSectionEventsInterface } from "../../../classes/template/profile/account_videos_section_events";
import { Constants } from "../../../namespaces/constants";

export default function setVideosSectionEvents(): void{
    let avseData: AccountVideosSectionEventsInterface = {
        addVideoButton: $('#upload-video-button'),
        addVideoInput: $('#upload-video-input')
    }
    let avse: AccountVideosSectionEvents = new AccountVideosSectionEvents(avseData)
    avse.getVideos(response => {
        console.log(response)
        if(response[Constants.KEY_DONE]){
            let vl_row: JQuery<HTMLDivElement> = $('#videos-list').find('.row') as JQuery<HTMLDivElement>;
            vl_row.html("");
            let row_content: string = "";
            response['result'].forEach(video => {
                let videotag: string = `
<div class="user-video col-12 col-sm-6 col-md-4 col-lg-3">
            <video controls>
                <source src="${video['_path']}" type="${video['_type']}">
            </video>
</div>  
            `;
                row_content += videotag;
            });
            vl_row.append(row_content)
        }
        
    })

}