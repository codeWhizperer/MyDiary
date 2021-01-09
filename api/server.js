const express = require('express')
const app = express();
require('dotenv').config()

const port = process.env.PORT || 3000
//Middleware
app.use(express.json())
const database = require('./models/user.model')
const post = require('./models/post.model')
const signIn = require('./auth/signin')
const signUp = require('./auth/signup')
const addEntries = require('./routes/addEntries')
const entries = require('./routes/entries')
const editEntries = require('./routes/editEntries')
const deleteEntries = require('./routes/deleteEntries')
const entryId = require('./routes/entryId');
app.get('/', (req, res)=>{
    res.status(200).json('Welcome to Homepage')
})

// middleware auth route
app.use('/auth', signIn)
app.use('/auth', signUp)
app.use('/api/v1', entries)
app.use('/api/v1/entry', addEntries)
app.use('/api/v1/entry', editEntries)
app.use('/api/v1/entry', deleteEntries)
app.use('/api/v1/entry', entryId)
app.get('*', (req,res)=>{
    res.send('Page doesn"/t exist' )
})



app.listen(port , (req, res)=>{
    console.log(`Server is runnung on ${port}`)
})
module.exports = app;