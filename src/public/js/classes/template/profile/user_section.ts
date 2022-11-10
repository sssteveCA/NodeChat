import { MyProfileSections } from "../../../enums/enums.js";
import Account from "../../../models/account.js";


export interface UserSectionInterface {
    account: Account;
    container: string;
    section: MyProfileSections;
}

export class UserSection{
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

    constructor(data: UserSectionInterface){
        this._account = data.account;
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
        this._html = `
<div class="sel-section-header">
        <h2 class="text-center">Informazioni personali</h2>
</div>
<div class="sel-section-content mt-5 d-flex flex-column">
    <fielset>
        <legend>Informazioni personali</legend>
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span class="fw-bold">Il tuo nome</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="name">${this._account.name}</span>
                </div>
            </div>  
            <div class="row">
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span class="fw-bold">Il tuo cognome</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="surname">${this._account.surname}</span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span class="fw-bold">Sesso</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="sex"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span class="fw-bold">Data di nascita</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="birth-date"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span class="fw-bold">Luogo di nascita</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="birth-place"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span class="fw-bold">Luogo di residenza</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="living-place"></span>
                </div>
            </div>
        </div>
    </fieldset>
        <legend>Istruzione</legend>
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span class="fw-bold">Scuola superiore</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="secondary-school"></span>
                </div>
            </div>  
            <div class="row">
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span class="fw-bold">Università</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="university"></span>
                </div>
            </div>
        </div>
    <fieldset>
        <legend>Lavoro</legend>
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span class="fw-bold">Lavoro attuale</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="work"></span>
                </div>
            </div>  
        </div>
    </fieldset>
    <fieldset>
        <legend>Informazioni di contatto</legend>
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span class="fw-bold">Numero di telefono</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="telephone"></span>
                </div>
            </div>  
            <div class="row">
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span class="fw-bold">Indirizzo email</span>
                </div>
                <div class="col-12 col-lg-6 my-1 my-lg-0">
                    <span id="email">${this._account.email}</span>
                </div>
            </div>
        </div>
    </fieldset>
</div>
        `;
    }

    private photosTemplate(): void{
        this._html = `
<div class="sel-section-header">
        <h2 class="text-center">Foto</h2>
</div>
<div class="sel-section-content mt-5">
    <p class="fs-4 fw-bold text-center">Nessuna foto da mostrare</p>
</div>
        `;
    }

    private settingsTemplate(): void{
        this._html = `
<div class="sel-section-header">
        <h2 class="text-center">Impostazioni account</h2>
</div>
<div class="sel-section-content mt-5">
    <p class="fs-4 fw-bold text-center">Impostazioni account</p>
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