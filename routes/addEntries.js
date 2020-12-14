//Add new entry
const express = require('express')
const route = express.Router()
const database = require('../models/post.model')

route.post('/addEntries', (req,res)=>{
    const {title, description} = req.body
    const databaseLength = database.Posts.length
    let oldId = database.Posts[databaseLength - 1].id
    let newId = oldId 
    database.Posts.push({
        id:newId + 1,
        title:title,
        description:description,
        createdOn: Date()
    })
res.json({
    status:"success",
    data: {
        id:oldId + 1,
        message:"entry successfully created",
        createdOn:Date(),
        title:title,
        description:description
    }
})
})










module.exports = route