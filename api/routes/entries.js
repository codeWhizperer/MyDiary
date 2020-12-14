const express = require('express')
const database = require('../models/post.model')
const route = express.Router()
const Post = require('../models/post.model')


route.get('/entries', (req,res)=>[
    res.json({status:"success", data:database.Posts})
])








module.exports = route