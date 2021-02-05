const { request } = require('express');
const express = require('express')
var bodyParser = require('body-parser')
const app = express();
require('dotenv').config()

const port =5000
//Middleware
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(express.json())
const path = require('./route/index')


app.get('/', (req, res)=>{
    res.status(200).json('Welcome to Homepage')
})

// middleware auth route
app.use('/api/v1/', path)

app.get('*', (req,res)=>{
    res.send('Page doesn"/t exist' )
})



app.listen(port , (req, res)=>{
    console.log(`Server is runnung on ${port}`)
})
module.exports = app;