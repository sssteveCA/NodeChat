import { MyProfileSections } from "../../../enums/enums";
import Account from "../../../models/account";


export interface SectionInterface {
    account: Account;
    container: string;
    section: MyProfileSections;
}

export class Section{
    /**
     * The logged user information
     */
    private _account: Account;
    /**
     * the id of container that must contain the generated HTML
     */
    private _container: string;
    /**
     * The generated HTML
     */
    private _html: string;
    /**
     * The section to display
     */
    private _section: MyProfileSections;
    
    private _errno: number = 0;
    private _error: string|null = null;

    constructor(data: SectionInterface){
        this._account = data.account;
        /* console.log("Section constructor account => ");
        console.log(this._account); */
        this._container = data.container;
        this._section = data.section;
        this.setTemplate();
    }

    get container(){return this._container;}
    get html(){return this._html;}
    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    private setTemplate():void{
        if(this._section == MyProfileSections.FRIENDS)this.friendsTemplate();
        else if(this._section == MyProfileSections.INFORMATION)this.informationTemplate();
        else if(this._section == MyProfileSections.PHOTOS)this.photosTemplate();
        else if(this._section == MyProfileSections.SETTINGS)this.settingsTemplate();
        else if(this._section == MyProfileSections.VIDEOS)this.videosTemplate();
        $('#'+this._container).html(this._html);
    }

    private friendsTemplate(): void{
        this._html = `
<div class="sel-section-header">
        <h2 class="text-center">Amici</h2>
</div>
<div class="sel-section-content mt-5">
        <p class="fs-4 fw-bold text-center">Non hai aggiunto ancora nessun amico</p>
</div>
        `;
    }

    private informationTemplate(): void{
        let birthDate = (this._account.otherPersonals["birthDate"]) ? this._account.otherPersonals["birthDate"] : "";
        let sex: string = this._account.otherPersonals["sex"];
        if(this._account.otherPersonals["sex"] == "M") sex = "Maschio";
        else if(this._account.otherPersonals["sex"] == "F") sex = "Femmina";
        this._html = `
<div class="sel-section-header">
        <h2 class="text-center">Informazioni personali</h2>
</div>
<div class="sel-section-content mt-5 d-flex flex-column">
    <fielset>
        <legend>Informazioni personali</legend>
        <div class="container">
            <div class="row">
                <div class="edit-button col-12">
                    <button id="bt_personal_info" class="btn btn-success bi bi-pen"></button>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="name_label" class="fw-bold">Il tuo nome</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="name_value">${this._account.name}</span>
                </div>
            </div>  
            <div class="row">
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="surname_label" class="fw-bold">Il tuo cognome</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="surname_value">${this._account.surname}</span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="sex_label" class="fw-bold">Sesso</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="sex_value">${sex}</span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="birth_date_label" class="fw-bold">Data di nascita</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="birth_date_value">${birthDate}</span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="birth_place_label"" class="fw-bold">Luogo di nascita</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="birth_place_value">${this._account.otherPersonals["birthPlace"]}</span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="living_place_label" class="fw-bold">Luogo di residenza</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="living_place_value">${this._account.otherPersonals["residence"]["address"]},${this._account.otherPersonals["residence"]["number"]},${this._account.otherPersonals["residence"]["city"]}</span>
                </div>
            </div>
        </div>
    </fieldset>
        <legend>Istruzione</legend>
        <div class="container">
            <div class="row">
                <div class="edit-button col-12">
                    <button id="bt_education" class="btn btn-success bi bi-pen"></button>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="secondary_school_label" class="fw-bold">Scuola superiore</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="secondary_school_value">${this._account.education["secondary"]}</span>
                </div>
            </div>  
            <div class="row">
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="university_label" class="fw-bold">Università</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="university_value">${this._account.education["university"]}</span>
                </div>
            </div>
        </div>
    <fieldset>
        <legend>Lavoro</legend>
        <div class="container">
            <div class="row">
                <div class="edit-button col-12">
                    <button id="bt_work" class="btn btn-success bi bi-pen"></button>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="work_label" class="fw-bold">Lavoro attuale</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="work_value">${this._account.employment}</span>
                </div>
            </div>  
        </div>
    </fieldset>
    <fieldset>
        <legend>Informazioni di contatto</legend>
        <div class="container">
            <div class="row">
                <div class="edit-button col-12">
                    <button id="bt_contacts_info" class="btn btn-success bi bi-pen"></button>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="telephone_label" class="fw-bold">Numero di telefono</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="telephone_value">${this._account.contacts["phone"]}</span>
                </div>
            </div>  
            <div class="row">
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="email_label" class="fw-bold">Indirizzo email</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="email_value">${this._account.contacts["email"]}</span>
                </div>
            </div>
        </div>
    </fieldset>
</div>
        `;
    }

    private photosTemplate(): void{
        this._html = `
<div class="sel-section-top-buttons d-flex justify-content-end">
    <button id="upload-photo-button" type="button" class="btn btn-primary">AGGIUNGI FOTO</button>
    <input id="upload-photo-input" type="file" class="d-none" name="photo" accept="image/png, image/jpeg">
</div>
<div class="sel-section-header">
        <h2 class="text-center">Foto</h2>
</div>
<div id="photos-list" class="sel-section-content mt-5 container-fluid">
        <div class="row g-2">
            <p class="fs-4 fw-bold text-center">Nessuna foto da mostrare</p>
        </div>
</div>
        `;
    }

    private settingsTemplate(): void{
        this._html = `
<div class="sel-section-header">
        <h2 class="text-center">Impostazioni account</h2>
</div>
<div class="sel-section-content mt-5 d-flex flex-column">
    <fieldset>
        <legend class="text-center">Elimina account</legend>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8 text-center">
Fai click sul bottone 'ELIMINA' per cancellare definitivamente il tuo account. Tutte le informazioni associate ad esso andranno perse
                </div>
            </div>
            <div class="row justify-content-center mt-3">
                <div class="col-8 col-md-6 col-lg-4 text-center">
                    <button type="button" id="delete-account-button" class="btn btn-danger btn-lg">ELIMINA</button>
                    <div id="delete-account-spinner" class="spinner-border invisible ms-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    </fieldset>
</div>
        `;
    }

    private videosTemplate(): void{
        this._html = `
<div class="sel-section-header">
        <h2 class="text-center">Video</h2>
</div>
<div class="sel-section-content mt-5">
    <p class="fs-4 fw-bold text-center">Nessun video da mostrare</p>
</div>
        `;
    }
}