
export interface VerifyRequestInterface{
    activation_code: string;
}

export class VerifyRequest{
    private _activation_code: string;
    private _verify_url: string;

    constructor(data: VerifyRequestInterface){
        this._activation_code = data.activation_code;
        this._verify_url = window.location.href;
        this.gotoActivationLink();
    }

    /**
     * Redirect to account verify URL after account verify form submit
     */
    private gotoActivationLink(): void{
        let full_link: string = `${this._verify_url}/${this._activation_code}`;
        window.location.href = full_link;
    }
}