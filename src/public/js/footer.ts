
$(()=>{
    //setFooter();
    setFooter();
    $(window).on('resize',()=>{
        //setFooter();
        setFooter();
    });
});

/**
 * Change footer position, comparing the window & body heights
 */
function setFooter(): void{
    let footer: JQuery = $('.footer');
    let heights: object = {
        wHeight: $(window).height(),
        bodyHeight: $('body').height()
    };
    if(heights['bodyHeight'] < heights['wHeight']){
        footer.css({
            position: 'fixed', bottom: '0px'
        });
    }
    else{
        footer.css({ position: 'static '});
    }
}