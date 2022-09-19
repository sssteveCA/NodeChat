
$(()=>{
    let logout_link:JQuery = $('#logout');
    if(logout_link.length){
        //If logout_link exists
        logout_link.on("click",(e)=>{
            e.preventDefault();
        });
    }//if(logout_link.length){
});