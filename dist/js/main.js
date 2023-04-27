$(function(){
    var sdk = new SDK();
    var chatgptResults = [];

    $('#btn-generate').on("click",function(event){
        
        event.preventDefault();

        $('#pnl-results').hide();
        
        $.ajax({
            url: '/chatgpt/getResults',
            method: 'POST',
            data:{
                prompt : $('#txt-prompt').val(),
                variations : $('#txt-variations').val()
            },
            success(results){
                chatgptResults = [];
                results.choices.forEach(choice => {
                    var resultText = choice.text.replace('"','');
                    $('#lst-results').append('<li>' + resultText + '</li>');
                    chatgptResults.push(resultText);
                    $('#pnl-results').show();
                });
            }
        });
        
    });

    $('#btn-use-results').on("click",function(event){
        event.preventDefault();

        sdk.setData({
            results : chatgptResults 
        });
        
        sdk.setContent($('#lst-results').html());
    });

})