
export interface SearchProfilesRequestInterface{
    query: string;
}

export class SearchProfilesRequest{
    private _query: string;
    private _errno:number = 0;
    private _error:string|null = null;

    constructor(data: SearchProfilesRequestInterface){
        this._query = data.query;
    }

    get query(){return this._query;}
    get errno(){return this._errno; }
    get error(){
        switch(this._errno){
            default:
                this._error = null;
                break;
        }
        return this._error;
    }
}