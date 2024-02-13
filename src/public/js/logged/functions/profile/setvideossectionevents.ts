import { MessageDialogInterface } from "../../../classes/dialogs/messagedialog";
import { AccountPhotosSectionEvents } from "../../../classes/template/profile/account_photos_section_events";
import { AccountVideosSectionEvents, AccountVideosSectionEventsInterface } from "../../../classes/template/profile/account_videos_section_events";
import { fMessageDialog } from "../../../functions/general";
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
            printVideos(response['result']);
        }
        
    })
    avse.addVideoButtonClick(response => {
        let mdData: MessageDialogInterface = {
            title: "Nuovo video", message: response[Constants.KEY_MESSAGE]
        }
        fMessageDialog(mdData);
    })
}

/**
 * Create HTML elements from videos list
 * @param result the videos list
 */
function printVideos(result: Array<object>): void{
    let vl_row: JQuery<HTMLDivElement> = $('#videos-list').find('.row') as JQuery<HTMLDivElement>;
    vl_row.html("");
    let row_content: string = "";
    result.forEach(video => {
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