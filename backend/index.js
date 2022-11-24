const express = require('express')
const app = express()


app.listen(5000, () => {
    console.log('nodemon is working')
})

app.get('/', function (req, res) {
  res.send('Hello World')
})
