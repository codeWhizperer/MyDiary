//Add new entry
const express = require('express')
const route = express.Router()
const database = require('../models/post.model')
//Add new entry endpoint
route.post('/addEntries', (req,res)=>{
 // get user input: title && description   
    const {title, description} = req.body
//Get the last item in the array by id    
    const databaseLength = database.Posts.length
    let oldId = database.Posts[databaseLength - 1].id
    let newId = oldId 
//add incoming entry to the end of array    
    database.Posts.push({
        id:newId + 1,
        title:title,
        description:description,
        createdOn: Date()
    })
//response    
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