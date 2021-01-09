// Get all entries
const express = require('express')
const database = require('../models/post.model')
const route = express.Router()


 route.get('/entries', (req,res)=>{
res.status(200).json({status:"success", data:database.Posts})
 })
module.exports = route