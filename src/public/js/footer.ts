
$(()=>{
    let container: JQuery = $('.container');
    let footer: JQuery = $('.footer');
    let wWidth: number = $(window).height() as number;
    let cWidth: number = container.height() as number;
    if(cWidth < wWidth){
        footer.css({
            position: 'fixed',
            bottom: '0',
        });
    }//if(cWidth < wWidth){
});