import { MessageDialog, MessageDialogInterface } from "../classes/dialogs/messagedialog";
import { SearchProfilesRequest, SearchProfilesRequestInterface } from "../classes/requests/searchprofilesrequest";
import { SearchProfilesTable, SearchProfilesTableInterface } from "../classes/tables/searchprofilestable";
import { fMessageDialog } from "../functions/general";
import { Constants } from "../namespaces/constants";

$(()=>{
    $('#ul_search').on('click',()=>{
        let query:string = $('#users_list_query').val() as string;
        let spr_data: SearchProfilesRequestInterface = {
            query: query, token_key: $('input[name=token_key]').val() as string
        };
        let spr: SearchProfilesRequest = new SearchProfilesRequest(spr_data);
        let search_spinner: JQuery<HTMLDivElement> = $('#search-spinner');
        search_spinner.toggleClass("invisible");
        spr.searchProfiles().then(obj => {
            search_spinner.toggleClass("invisible");
            if(obj[Constants.KEY_DONE] == true){
                let profiles: [] = obj['profiles'];
                let srt_data: SearchProfilesTableInterface = {
                    query: query, profiles: profiles
                };
                let srt: SearchProfilesTable = new SearchProfilesTable(srt_data);
                $('#users-results').html(srt.html_table as string);
            }//if(obj[Constants.KEY_DONE] == true){
            else{
                let md_data: MessageDialogInterface = {
                    title: 'Ricerca utenti', message: obj[Constants.KEY_MESSAGE]
                };
                fMessageDialog(md_data);
            }
        });
    });//$('#ul_search').on('click',()=>{
});