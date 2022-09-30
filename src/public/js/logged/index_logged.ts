import { MessageDialog, MessageDialogInterface } from "../classes/dialogs/messagedialog.js";
import { SearchProfilesRequest, SearchProfilesRequestInterface } from "../classes/requests/searchprofilesrequest.js";
import { SearchProfilesTable, SearchProfilesTableInterface } from "../classes/tables/searchprofilestable.js";

$(()=>{
    $('#ul_search').on('click',()=>{
        let query:string = $('#users_list_query').val() as string;
        let spr_data: SearchProfilesRequestInterface = {
            query: query, token_key: $('input[name=token_key]').val() as string
        };
        let spr: SearchProfilesRequest = new SearchProfilesRequest(spr_data);
        spr.searchProfiles().then(obj => {
            console.log(obj);
            if(obj['done'] == true){
                let accounts: [] = obj['result'];
                let srt_data: SearchProfilesTableInterface = {
                    query: query, results: accounts
                };
                let srt: SearchProfilesTable = new SearchProfilesTable(srt_data);
                $('#users-list').html(srt.html_table as string);
            }//if(obj['done'] == true){
            else{
                let md_data: MessageDialogInterface = {
                    title: 'Ricerca utenti', message: obj['msg']
                };
                messageDialog(md_data);
            }
        });
    });//$('#ul_search').on('click',()=>{
});

function messageDialog(md_data: MessageDialogInterface): void{
    let md: MessageDialog = new MessageDialog(md_data);
    md.btOk.on('click',()=>{
        md.dialog.dialog('destroy');
        md.dialog.remove();
    });
}