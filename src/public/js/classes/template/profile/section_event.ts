
export interface SectionEventInterface{
    personalInfoButton: JQuery<HTMLButtonElement>;
    educationButton: JQuery<HTMLButtonElement>;
    workButton: JQuery<HTMLButtonElement>;
    contactInfoButton: JQuery<HTMLButtonElement>;
}

/**
 * This class contains the personal profile events and actions
 */
export class SectionEvent{
    private _personalInfoButton: JQuery<HTMLButtonElement>;
    private _educationButton: JQuery<HTMLButtonElement>;
    private _workButton: JQuery<HTMLButtonElement>;
    private _contactInfoButton: JQuery<HTMLButtonElement>;

    constructor(data: SectionEventInterface){
        this._personalInfoButton = data.personalInfoButton;
        this._educationButton = data.educationButton;
        this._workButton = data.workButton;
        this._contactInfoButton = data.contactInfoButton;
    }

    get personalInfoButton(){return this._personalInfoButton;}
    get educationButton(){return this._educationButton;}
    get workButton(){return this._workButton;}
    get contactInfoButton(){return this._contactInfoButton;}


}