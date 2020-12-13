const express = require('express')

const app = express();
require('dotenv').config()

const port = process.env.PORT || 3000
//Middleware
app.use(express.json())
const database = require('../v1/models/user.model')
const post = require('../v1/models/post.model')
const signIn = require('../v1/auth/signin')
const signUp = require('../v1/auth/signup')
const addEntries = require('../v1/routes/addEntries')
const entries = require('../v1/routes/entries')
const editEntries = require('../v1/routes/editEntries')
const deleteEntries = require('../v1/routes/deleteEntries')
const entryId = require('../v1/routes/entryId')
app.get('/', (req, res)=>{
    res.json({
        status:200,
        data: post.Posts
    })
})

//middleware auth route
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