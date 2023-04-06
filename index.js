const express = require('express')
var bodyParser  = require('body-parser');
const app = express()
const port = 3000
const chatgpt = require('./routes/chatgpt');

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ type: 'application/json', limit: '50mb', extended: true }));
// routes
app.post('/chatgpt/getResults/',chatgpt.getResults);

app.use('/',express.static('dist'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
