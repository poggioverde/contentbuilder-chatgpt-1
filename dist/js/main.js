var chatgptResults = [];
var promptVar,variationsVar,tagVar;

$(function(){
    var sdk = new SDK({
        blockEditorWidth: 600,
        tabs: [
            'htmlblock',  
            'stylingblock'  
        ]
    });

    $('#btn-generate').on("click",function(event){
        
        event.preventDefault();

        $('#spinner').show();
        $('#pnl-results').hide();

        promptVar = $('#txt-prompt').val();
        variationsVar = $('#txt-variations').val();
        tagVar = $('#txt-tag').val();

        $.ajax({
            url: '/chatgpt/getResults',
            method: 'POST',
            data:{
                prompt :'Write an alternative for this text: '+ promptVar,
                variations : variationsVar
            },
            success(results){
                chatgptResults = [];
                results.choices.forEach(choice => {
                    var resultText = choice.text.replace('"','');
                    $('#lst-results').append('<li>' + resultText + '</li>');
                    chatgptResults.push(resultText);
                    $('#pnl-results').show();
                    $('#spinner').hide();
                });
            }
        });
        
    });

    $('#btn-use-results').on("click",function(event){
        event.preventDefault();

        sdk.setData({
            prompt:  promptVar,
            results : chatgptResults,
            variations : variationsVar,
            tag : tagVar
        });

        var contentBlockContent = '<script runat=server> \n\
            Platform.Load("Core","1"); \n \
            \n\
                    var generatedContentRows = ['+generateResultsArray()+']; \n\
                    var variation = Math.floor(Math.random() * '+ variationsVar +'); \n\
                    var text = generatedContentRows[variation]; \n\
                    Variable.SetValue("@generatedContent", text); \n\
                    if(variation == 0) \n\
                    Variable.SetValue("@generatedContentAlias", "'+ tagVar +'" + "-default"); \n\
                    else \n\
                    Variable.SetValue("@generatedContentAlias", "'+ tagVar +'" + "-" + (variation+1)); \n\
        </script> \n\
        %%=v(@generatedContent)=%%';
        
        sdk.setContent(contentBlockContent);

    });

})

function generateResultsArray(){
    var textArray = '"'+promptVar+'",';
    for (let index = 0; index < chatgptResults.length; index++) {
        textArray += '"'+chatgptResults[index].trim()+'"';
        if(index < chatgptResults.length - 1)
            textArray += ',';
    }
    return textArray;
}