const request = require('request');

exports.getResults = function(req, res) {
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
                "n": parseInt(req.body.variations) 
            },
        }, (err, response, body) => {
            if (err)
                return res.status(500).send(err);
   
            return res.status(200).send(body);
        });
}
