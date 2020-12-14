//entry point
const express = require('express')
// instance of express
const app = express();
//dotenv config
require('dotenv').config()

const port = process.env.PORT || 3000
//Middleware
app.use(express.json())
//require route files
const database = require('../v1/models/user.model')
const post = require('../v1/models/post.model')
const signIn = require('../v1/auth/signin')
const signUp = require('../v1/auth/signup')
const addEntries = require('../v1/routes/addEntries')
const entries = require('../v1/routes/entries')
const editEntries = require('../v1/routes/editEntries')
const deleteEntries = require('../v1/routes/deleteEntries')
const entryId = require('../v1/routes/entryId')
// 'home route'
app.get('/', (req, res)=>{
    res.json({
        status:200,
        data: post.Posts
    })
})

// Middlewares
app.use('/auth', signIn)
app.use('/auth', signUp)
app.use('/api/v1', entries)
app.use('/api/v1/entry', addEntries)
app.use('/api/v1/entry', editEntries)
app.use('/api/v1/entry', deleteEntries)
app.use('/api/v1/entry', entryId)
// when a user routes to a non-existing api-endpoint.
app.get('*', (req,res)=>{
    res.send('Page doesn"/t exist' )
})





//port
app.listen(port , (req, res)=>{
    console.log(`Server is runnung on ${port}`)
})