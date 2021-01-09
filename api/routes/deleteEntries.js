//delete an entry by id
const express = require('express')
const route = express.Router()
const database = require('../models/post.model')



route.delete('/:id', (req, res) => {
    const {id} = req.params;
    let match = database.Posts.findIndex(post => post.id == id)
    if(match < 0) return res.status(404).json({status:"Error", message:"Entry ID not found"})
    database.Posts.splice(match, 1)
    return res.status(200).json({status:"Success", message:"Entry Deleted"})
})


 

module.exports = route
