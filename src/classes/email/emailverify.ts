
export interface EmailVerifyInterface{
    home_url: string;
    route_name: string;
    activation_code: string;
}

export class EmailVerify{
    private _home_url: string;
    private _route_name: string;
    private _activation_code: string;
    private _mail_body: string = "";

    constructor(data: EmailVerifyInterface){
        this._home_url = data.home_url;
        this._route_name = data.route_name;
        this._activation_code = data.activation_code;
    }

    get activation_code(){return this._activation_code;}
}