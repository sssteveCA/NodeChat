
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

    public personalInfoButtonClick(): void{
        this._personalInfoButton.on('click',()=>{
            this._personalInfoButton.toggleClass("btn-success bi-pen");
            this._personalInfoButton.toggleClass("btn-danger bi-x-circle-fill");

        });
    }

    public educationButtonClick(): void{
        this._educationButton.on('click',()=>{
            this._educationButton.toggleClass("btn-success bi-pen");
            this._educationButton.toggleClass("btn-danger bi-x-circle-fill");
        })
    }

    public workButtonClick(): void{
        this._workButton.on('click',()=>{
            this._workButton.toggleClass("btn-success bi-pen");
            this._workButton.toggleClass("btn-danger bi-x-circle-fill");
        });
    }

    public contactInfoButtonClick(): void{
        this._contactInfoButton.on('click',()=>{
            this._contactInfoButton.toggleClass("btn-success bi-pen");
            this._contactInfoButton.toggleClass("btn-danger bi-x-circle-fill");
        });
    }


}