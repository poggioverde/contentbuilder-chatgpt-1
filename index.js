const express = require('express')
const app = express()
const port = 3000
const chatgpt = require('./routes/chatgpt');

// routes
app.post('/chatgpt/getResults/',chatgpt.getResults);

app.use('/',express.static('dist'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
