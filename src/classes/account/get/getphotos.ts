
export interface GetPhotosInterface{
    token_key: string;
}

export class GetPhotos{

    private _token_key: string;
    private _errno: number = 0;
    private _error: string|null = null;

    constructor(data: GetPhotosInterface){
        this._token_key = data.token_key;
    }

    get errno(){return this._errno;}
    get error(){
        switch(this._errno){
            default:
                this._error = null;
                break;
        }
        return this._error;
    }
}