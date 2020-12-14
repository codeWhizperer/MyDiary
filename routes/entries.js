//View all entry
const express = require('express')
const database = require('../models/post.model')
const route = express.Router()
const Post = require('../models/post.model')

//get all entry from dummy data
route.get('/entries', (req,res)=>[
    res.json({status:"success", data:database.Posts})
])
module.exports = route