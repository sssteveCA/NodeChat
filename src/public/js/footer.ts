
$(()=>{
    //setFooter();
    setFooterPosition();
    $(window).on('resize',()=>{
        //setFooter();
        setFooterPosition();
    });
});

/**
 * Change footer position, comparing the window & container heights
 */
function setFooter(): void{
    let body: JQuery = $('body');
    let container: JQuery = $('.my-container');
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

function setFooterPosition(): void{
    let footer: JQuery = $('.footer');
    let heights: object = {
        wHeight: $(window).height(),
        bodyHeight: $('body').height()
    };
    console.log("footer.ts setFooterPosition heights object");
    console.log(heights);
    if(heights['bodyHeight'] < heights['wHeight']){
        footer.css({
            position: 'fixed', bottom: '0px'
        });
    }
    else{
        footer.css({ position: 'static '});
    }
}