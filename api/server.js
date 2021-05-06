const { request } = require('express');
const express = require('express')
const cors = require("cors")
const pathIndex = require('path')
var bodyParser = require('body-parser')
const app = express();
require('dotenv').config()


const port =process.env.PORT || 5000
//Middleware
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(express.json())
const path = require('./routes/index')


app.get('/', (req, res)=>{
    res.sendFile(pathIndex.join(__dirname, '../index.html'))
});

// middleware auth route
app.use('/api/v1/', path)

app.get('*', (req,res)=>{
    res.send('Page doesn"/t exist' )
})



app.listen(port , (req, res)=>{
    console.log(`Server is running on ${port}`)
})
module.exports = app;