
export interface SearchProfilesTableInterface{
    results: [];
}

export class SearchProfilesTable{

    private _html_table: string|null = null; //The table generated with the profiles list
    private _results: [] = [];

    constructor(data: SearchProfilesTableInterface){
        this._results = data.results;
    }

    get html_table(){return this._html_table;}
    get results(){return this._results;}

}