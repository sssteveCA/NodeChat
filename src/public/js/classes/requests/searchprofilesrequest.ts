
export interface SearchProfilesRequestInterface{
    query: string;
    token_key: string;
}

export class SearchProfilesRequest{
    private _query: string;
    private _profiles: [];
    private _token_key: string;
    private _errno:number = 0;
    private _error:string|null = null;

    public static ERR_SEARCH_PROFILES:number = 1;

    private static ERR_SEARCH_PROFILES_MSG:string = "Errore durante la ricerca dei profili richiesti";

    private static FETCH_URL: string = "api/profile/search";

    constructor(data: SearchProfilesRequestInterface){
        this._query = data.query;
        this._token_key = data.token_key;
    }

    get query(){return this._query;}
    get profiles(){return this._profiles;}
    get errno(){return this._errno; }
    get error(){
        switch(this._errno){
            case SearchProfilesRequest.ERR_SEARCH_PROFILES:
                this._error = SearchProfilesRequest.ERR_SEARCH_PROFILES_MSG;
                break;
            default:
                this._error = null;
                break;
        }
        return this._error;
    }

    /**
     * Search the profiles that matches the input query
     * @returns the response
     */
    public async searchProfiles(): Promise<object>{
        let response: object = {};
        this._errno = 0;
        try{
            await this.searchProfilePromise().then(res => {
                //console.log("searchprofilesrequest =>");
                //console.log(res);
                let obj = JSON.parse(res);
                //console.log(obj);
                response = {
                    done: obj['done'],
                    msg: obj['msg'],
                    profiles: obj['result']
                };
                this._profiles = response['profiles'];
            }).catch(err => {
                console.warn(err);
                throw err;
            });
        }catch(e){
            this._errno = SearchProfilesRequest.ERR_SEARCH_PROFILES;
            response = {
                done: false,
                msg: this.error
            };
        }
        return response;
    }

    private async searchProfilePromise(): Promise<string>{
        return await new Promise<string>((resolve,reject)=>{
            let url: string = SearchProfilesRequest.FETCH_URL;
            let body_data: SearchProfilesRequestInterface = {
                query: this._query, token_key: this._token_key
            };
            fetch(url,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body_data)
            }).then(res => {
                resolve(res.text());
            }).catch(err => {
                reject(err);
            });
        });
    }
}