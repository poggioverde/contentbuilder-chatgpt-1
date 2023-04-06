const request = require('request');

exports.getResults = function(req, res) {
    return new Promise(function(resolve, reject) {
        request({
            url: 'https://api.openai.com/v1/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + process.env.CHATGTP_KEY
            },
            json: {
                "model": "text-davinci-003",
                "prompt": req.body.prompt,
                "max_tokens": 256,
                "temperature": 0.5,
                "n": req.body.variations
            },
        }, (err, response, body) => {
            if (err)
                reject(JSON.stringify(err));
            resolve(body);
        })
    });
}
