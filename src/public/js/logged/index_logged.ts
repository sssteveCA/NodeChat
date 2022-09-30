import { MessageDialog, MessageDialogInterface } from "../classes/dialogs/messagedialog.js";
import { SearchProfilesRequest, SearchProfilesRequestInterface } from "../classes/requests/searchprofilesrequest.js";
import { SearchProfilesTable, SearchProfilesTableInterface } from "../classes/tables/searchprofilestable.js";
import { fMessageDialog } from "../functions/general.js";

$(()=>{
    $('#ul_search').on('click',()=>{
        let query:string = $('#users_list_query').val() as string;
        let spr_data: SearchProfilesRequestInterface = {
            query: query, token_key: $('input[name=token_key]').val() as string
        };
        let spr: SearchProfilesRequest = new SearchProfilesRequest(spr_data);
        spr.searchProfiles().then(obj => {
            //console.log(obj);
            if(obj['done'] == true){
                let profiles: [] = obj['profiles'];
                let srt_data: SearchProfilesTableInterface = {
                    query: query, profiles: profiles
                };
                let srt: SearchProfilesTable = new SearchProfilesTable(srt_data);
                //console.log(srt.html_table);
                $('#users-results').html(srt.html_table as string);
            }//if(obj['done'] == true){
            else{
                let md_data: MessageDialogInterface = {
                    title: 'Ricerca utenti', message: obj['msg']
                };
                fMessageDialog(md_data);
            }
        });
    });//$('#ul_search').on('click',()=>{
});