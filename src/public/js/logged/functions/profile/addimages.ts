
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
    })

}