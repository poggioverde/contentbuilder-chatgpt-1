$(function(){

    $('#btn-generate').on("click",function(){
       
        $('#pnl-results').hide();
        
        $.ajax({
            url: '/chatgpt/getResults',
            method: 'POST',
            data:{
                prompt : $('#txt-prompt').val(),
                variations : $('#txt-variations').val()
            },
            success(results){
                results.choices.forEach(choice => {
                    $('#lst-results').append('<li>' + choice.text + '</li>');
                    $('#pnl-results').show();
                });
            }
        });
        
    });

})