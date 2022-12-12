import { MessageDialog, MessageDialogInterface } from "../../../classes/dialogs/messagedialog.js";
import { ProfileImageUpload, ProfileImageUploadInterface } from "../../../classes/requests/profileimageupload.js";

export function addImages(profile: string, cover: string): void{
    $('.profile-image').html(`
<img id="profile-image" src="${profile}" alt="Immagine del profilo" title="Immagine del profilo">
<input type="file" id="profile-image-input" name="profile_image">
<button type="button" id="profile-button" class="btn btn-success bi bi-pen"></button>`);
    $('.cover-image').html(`
<img id="cover-image" src="${cover}" alt="Immagine di copertina" title="Immagine di copertina">
<input type="file" id="cover-image-input" name="cover_image">
<button type="button" id="cover-button" class="btn btn-primary bt-lg">MODIFICA L'IMMAGINE DI COPERTINA</button>`
);
    let profile_button: JQuery<HTMLButtonElement> = $('#profile-button');
    let profile_image: JQuery<HTMLImageElement> = $('#profile-image');
    let profile_image_input: JQuery<HTMLInputElement> = $('#profile-image-input');
    profile_button.on('click',()=>{
        profile_image_input.trigger('click');  
    });
    profile_image_input.on('change',()=>{
        let piuData: ProfileImageUploadInterface = {
            token_key:  $('input[name=token_key]').val() as string, 
            image: profile_image_input[0].files?.[0] as File
        }
        //console.log(piuData);
        let piu: ProfileImageUpload = new ProfileImageUpload(piuData);
        piu.uploadImage().then(obj => {
            //console.log("piu uploadImage => ");
            //console.log(obj);
            let cdData: MessageDialogInterface = { title: "Immagine del profilo", message: obj["msg"] };
            let cd: MessageDialog = new MessageDialog(cdData);
            cd.btOk.on('click',()=>{
                cd.dialog.dialog('destroy');
                cd.dialog.remove();
            });
            if(obj["done"] == true){
                profile_image.attr('src',obj["dest"]);
            }
        });
    });

}