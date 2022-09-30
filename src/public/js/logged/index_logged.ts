import { SearchProfilesRequest, SearchProfilesRequestInterface } from "../classes/requests/searchprofilesrequest";
import { SearchProfilesTable } from "../classes/tables/searchprofilestable";

$(()=>{
    $('#ul_search').on('click',()=>{
        let spr_data: SearchProfilesRequestInterface = {
            query: $('#users_list_query').val() as string,
            token_key: $('input[name=token_key]').val() as string
        };
        let spr: SearchProfilesRequest = new SearchProfilesRequest(spr_data);
        spr.searchProfiles().then(obj => {
            console.log(obj);
            if(obj['done'] == true){

            }//if(obj['done'] == true){
            else{

            }
        });
    });//$('#ul_search').on('click',()=>{
});