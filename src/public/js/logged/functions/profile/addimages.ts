import { MessageDialog, MessageDialogInterface } from "../../../classes/dialogs/messagedialog";
import { ProfileImageUpload, ProfileImageUploadInterface } from "../../../classes/requests/profileimageupload";

export function addImages(profile: string, cover: string): void{
    $('.profile-image').html(`
<img src="${profile}" alt="Immagine del profilo" title="Immagine del profilo">
<input type="file" id="profile-image" name="profile_image">
<button type="button" id="profile-button" class="btn btn-success bi bi-pen"></button>`);
    $('.cover-image').html(`<img src="${cover}" alt="Immagine di copertina" title="Immagine di copertina"><button type="button" id="cover-button" class="btn btn-primary bt-lg">MODIFICA L'IMMAGINE DI COPERTINA</button>`);
    let profile_button: JQuery<HTMLButtonElement> = $('#profile-button');
    let profile_image: JQuery<HTMLInputElement> = $('#profile-image');
    profile_button.on('click',()=>{
        profile_image.trigger('click');  
    });
    profile_image.on('change',()=>{
        let piuData: ProfileImageUploadInterface = {
            token_key:  $('input[name=token_key]').val() as string,
            image: profile_image[0].files?.[0] as File
        }
        let piu: ProfileImageUpload = new ProfileImageUpload(piuData);
        piu.uploadImage().then(obj => {
            let cdData: MessageDialogInterface = {
                title: "Immagine del profilo", message: obj["msg"]
            };
            let cd: MessageDialog = new MessageDialog(cdData);
            cd.btOk.on('click',()=>{
                cd.dialog.dialog('destroy');
                cd.dialog.remove();
            })
        });
    });

}