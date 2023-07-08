import { AddVideoRequest, AddVideoRequestInterface } from "../../requests/addvideorequest";
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
     * Execute the HTTP request to add a new video
     * @param callback the callback to invoke when a response is returned
     */
    public addVideoButtonClick(callback: (response: object) => void): void{
        this._addVideoButton.on('click',()=>{
            this._addVideoInput.trigger('click');
        });
        this._addVideoInput.on('change',(e)=>{
            if(e.target.files){
                let avrData: AddVideoRequestInterface = {
                    video: e.target.files[0] as File,
                    token_key: $('input[name=token_key]').val() as string
                }
                let avr: AddVideoRequest = new AddVideoRequest(avrData);
                avr.addVideo().then(res => {
                    callback(res);
                })
            }
        });
    }

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