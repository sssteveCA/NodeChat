import { GetVideosRequest, GetVideosRequestInterface } from "../../requests/getvideosrequest";

export interface AccountVideosSectionEventsInterface{
    addVideoButton: JQuery<HTMLButtonElement>;
    addVideoInput: JQuery<HTMLInputElement>;
}

export class AccountVideosSectionEvents{
    private _addVideoButton: JQuery<HTMLButtonElement>;
    private _addVideoInput: JQuery<HTMLInputElement>;

    constructor(data: AccountVideosSectionEventsInterface){
        this._addVideoButton = data.addVideoButton;
        this._addVideoInput = data.addVideoInput;
    }

    get addVideoButton(){ return this._addVideoButton; }
    get addVideoInput(){ return this._addVideoInput; }

    /**
     * Execute the HTTP request to get the user videos
     * @param callback the callback to invoke when a response is returned
     */
    public getVideos(callback: (response: object) => void): void{
        let gvrData: GetVideosRequestInterface = {
            token_key: $('input[name=token_key]').val() as string
        }
        let gvr: GetVideosRequest = new GetVideosRequest(gvrData)
        gvr.gtRequest().then(res => {
            callback(res)
        })
    }
}