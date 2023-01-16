
export interface SearchProfilesTableInterface{
    query: string;
    profiles: [];
}

export class SearchProfilesTable{

    private _html_table: string|null = null; //The table generated with the profiles list
    private _query: string;
    private _profiles: [] = [];

    constructor(data: SearchProfilesTableInterface){
        this._query = data.query;
        this._profiles = data.profiles;
        this.setTable();
    }

    get html_table(){return this._html_table;}
    get query(){return this._query;}
    get results(){return this._profiles;}

    /**
     * Set the table HTML code
     */
    private setTable(): void{
        if(this._profiles && this._profiles.length > 0){
            /* console.log("SearchProfileTable profiles => ");
            console.log(this._profiles); */
            this._html_table = `
<table class="table table-striped">
    <thead>
        <tr>
            <th scope="col"></th>
            <th scope="col">Nome utente</tr>
            <th scope="col"></tr>
        </tr>
    </thead>
    <tbody>
`; 
            this._profiles.forEach(acc => {
                this._html_table += this.setSingleRow(acc);
            });
            this._html_table += `
    </tbody>
</table>        
            `;
        }//if(this._profiles && this._profiles.length > 0){
        else{
            this._html_table = `<h4 class=text-center w-100">Nessun profilo trovato con il termine ${this._query}</h4>`
        }

    }

    /**
     * Set the single row for the table
     * @param account Single account data 
     * @returns Single table row content
     */
    private setSingleRow(account: object): string{
        let row: string = `
<tr>
    <td class="profile-image">
        <img src="${account['_images']['profileImage']}" alt="Immagine del profilo" title="Immagine del profilo">
    </td>
    <td>${account['_username']}</td>
    <td>
        <a class="btn btn-primary" href="/profile/${account["_username"]}" role="button">VAI AL PROFILO</a>
    </td>
</tr>  
        `;
        return row;
    }

}