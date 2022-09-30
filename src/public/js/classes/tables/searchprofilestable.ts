
export interface SearchProfilesTableInterface{
    results: [];
}

export class SearchProfilesTable{

    private _html_table: string|null = null; //The table generated with the profiles list
    private _results: [] = [];

    constructor(data: SearchProfilesTableInterface){
        this._results = data.results;
        this.setTable();
    }

    get html_table(){return this._html_table;}
    get results(){return this._results;}

    /**
     * Set the table HTML code
     */
    private setTable(): void{
        this._html_table = `
<table class="table table-striped">
    <thead>
        <tr>
            <th scope="col">Nome utente</tr>
            <th scope="col"></tr>
        </tr>
    </thead>
    <tbody>
`; 
        this._results.forEach(acc => {
            this._html_table += this.setSingleRow(acc);
        });
        this._html_table += `
    </tbody>
</table>        
        `;
    }

    /**
     * Set the single row for the table
     * @param account Single account data 
     * @returns Single table row content
     */
    private setSingleRow(account: object): string{
        let row: string = `
<tr>
    <td>${account['username']}</td>
    <td>
        <button type="button" class="btn btn-primary">VAI AL PROFILO</button>
    </td>
</tr>  
        `;
        return row;
    }

}