$(()=>{
    $('#showPass').on('change',(e)=>{
        let checkbox = $(e.target);
        if(checkbox.is(':checked'))
            $('#password').attr('type','text');
        else
            $('#password').attr('type','password');
    });
});