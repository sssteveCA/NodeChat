import { MyProfileSections } from "../../../enums/enums";


export interface SectionInterface {
    account: object;
    container: string;
    section: MyProfileSections;
}

export class Section{
    /**
     * The logged user information
     */
    private _account: object;
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
    }

    private friendsTemplate(): void{
        this._html = `
<div class="sel-section-header">
        <h2 class="text-center">Amici</h2>
</div>
<div class="sel-section-content">
</div>
        `;
    }

    private informationTemplate(): void{
        this._html = `
<div class="sel-section-header">
        <h2 class="text-center">Informazioni personali</h2>
</div>
<div class="sel-section-content">
</div>
        `;
    }

    private photosTemplate(): void{
        this._html = `
<div class="sel-section-header">
        <h2 class="text-center">Foto</h2>
</div>
<div class="sel-section-content">
</div>
        `;
    }

    private settingsTemplate(): void{
        this._html = `
<div class="sel-section-header">
        <h2 class="text-center">Impostazioni account</h2>
</div>
<div class="sel-section-content">
</div>
        `;
    }

    private videosTemplate(): void{
        this._html = `
<div class="sel-section-header">
        <h2 class="text-center">Video</h2>
</div>
<div class="sel-section-content">
</div>
        `;
    }
}