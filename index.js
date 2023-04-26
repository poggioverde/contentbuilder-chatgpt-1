const express = require('express')
const bodyParser  = require('body-parser');
const app = express();
const http = require('http');
const chatgpt = require('./routes/chatgpt');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ type: 'application/json', limit: '50mb', extended: true }));
// routes
app.post('/chatgpt/getResults/',chatgpt.getResults);

app.use('/',express.static('dist'));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});