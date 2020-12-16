const express = require('express')

const app = express();
require('dotenv').config()

const port = process.env.PORT || 3000
//Middleware
app.use(express.json())
const database = require('../api/models/user.model')
const post = require('../api/models/post.model')
const signIn = require('../api/auth/signin')
const signUp = require('../api/auth/signup')
const addEntries = require('../api/routes/addEntries')
const entries = require('../api/routes/entries')
const editEntries = require('../api/routes/editEntries')
const deleteEntries = require('../api/routes/deleteEntries')
const entryId = require('../api/routes/entryId')
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