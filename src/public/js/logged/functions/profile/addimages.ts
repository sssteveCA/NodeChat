import { MessageDialog, MessageDialogInterface } from "../../../classes/dialogs/messagedialog";
import { CoverImageUploadRequest, CoverImageUploadRequestInterface } from "../../../classes/requests/coverimageuploadrequest";
import { ProfileImageUploadRequest, ProfileImageUploadRequestInterface } from "../../../classes/requests/profileimageuploadrequest";
import { Constants } from "../../../namespaces/constants";

export function addImages(profile: string, cover: string): void{
    $('.profile-image').html(`
<img id="profile-image" src="${profile}" alt="Immagine del profilo" title="Immagine del profilo">
<input type="file" id="profile-image-input" class="d-none" name="profile_image">
<button type="button" id="profile-button" class="btn btn-success bi bi-pen"></button>`);
    $('.cover-image').html(`
<img id="cover-image" src="${cover}" alt="Immagine di copertina" title="Immagine di copertina">
<input type="file" id="cover-image-input" class="d-none" name="cover_image">
<button type="button" id="cover-button" class="btn btn-primary bt-lg">MODIFICA L'IMMAGINE DI COPERTINA</button>`
);
    let profile_button: JQuery<HTMLButtonElement> = $('#profile-button');
    let cover_button: JQuery<HTMLInputElement> = $('#cover-button');
    let cover_image: JQuery<HTMLInputElement> = $('#cover-image');
    let profile_image: JQuery<HTMLImageElement> = $('#profile-image');
    let cover_image_input: JQuery<HTMLInputElement> = $('#cover-image-input');
    let profile_image_input: JQuery<HTMLInputElement> = $('#profile-image-input');
    profile_button.on('click',()=>{
        profile_image_input.trigger('click');  
    });
    profile_image_input.on('change',()=>{
        const piurData: ProfileImageUploadRequestInterface = {
            token_key:  $('input[name=token_key]').val() as string, 
            image: profile_image_input[0].files?.[0] as File
        }
        //console.log(piuData);
        let piur: ProfileImageUploadRequest = new ProfileImageUploadRequest(piurData);
        piur.uploadImage().then(obj => {
            console.log("piu uploadImage => ");
            console.log(obj);
            const cdData: MessageDialogInterface = { title: "Immagine del profilo", message: obj[Constants.KEY_MESSAGE] };
            let cd: MessageDialog = new MessageDialog(cdData);
            cd.btOk.on('click',()=>{
                cd.dialog.dialog('destroy');
                cd.dialog.remove();
            });
            if(obj[Constants.KEY_DONE] == true){
                profile_image.attr('src',obj["dest"]);
            }
        });
    });
    cover_button.on('click',()=>{
        cover_image_input.trigger('click');
    });
    cover_image_input.on('change',()=>{
        const ciurData: CoverImageUploadRequestInterface = {
            token_key: $('input[name=token_key]').val() as string,
            image: cover_image_input[0].files?.[0] as File
        }
        let ciur: CoverImageUploadRequest = new CoverImageUploadRequest(ciurData);
        ciur.uploadImage().then(obj =>{
            //console.log("piu uploadImage => ");
            //console.log(obj);
            let cdData: MessageDialogInterface = { title: "Immagine del profilo", message: obj[Constants.KEY_MESSAGE] };
            let cd: MessageDialog = new MessageDialog(cdData);
            cd.btOk.on('click',()=>{
                cd.dialog.dialog('destroy');
                cd.dialog.remove();
            });
            if(obj[Constants.KEY_DONE] == true){
                cover_image.attr('src',obj["dest"]);
            }
        });
    });


}