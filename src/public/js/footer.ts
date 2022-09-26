
$(()=>{
    setFooter();
    $(window).on('resize',()=>{
        setFooter();
    });
});

/**
 * Change footer position, comparing the window & container heights
 */
function setFooter(): void{
    let body: JQuery = $('body');
    let container: JQuery = $('.container');
    let footer: JQuery = $('.footer');
    let menu: JQuery = $('.menu-bar');
    let heights: object = {
        wHeight: $(window).height() as number,
        cHeight: container.height() as number,
        fHeight: footer.height() as number,
        mHeight: menu.height() as number
    }
    if(heights['cHeight'] < (heights['wHeight'] - heights['fHeight'] - heights['mHeight'] - 50)){
        footer.css({position: 'fixed',bottom: '0'});
        body.css('position','');
    }// if(heights['cHeight'] < (heights['wHeight'] - heights['fHeight'] - heights['mHeight'] - 50)){
    else{
        body.css('position','relative');
        footer.css({position: '',bottom: ''});
    }
}