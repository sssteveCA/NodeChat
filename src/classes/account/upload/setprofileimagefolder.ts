
export interface SetProfileImageFolderInterface{
    image_dir: string;
    token_key: string;
}

export class SetProfileImageFolder{
    private _image_dir: string;
    private _token_key: string;
    private _errno:number = 0;
    private _error:string|null = null;

    constructor(data: SetProfileImageFolderInterface){
        this._image_dir = data.image_dir;
        this._token_key = data.token_key;
    }

    get image_dir(){ return this._image_dir; }
    get token_key(){ return this._token_key; }
    get errno(){ return this._errno; }
    get error(){
        switch(this._errno){
            default:
                this._error = null;
                break;
        }
        return this._error;
    }
}