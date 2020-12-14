//Edit entry by :id
const express = require('express')
const route = express.Router()
const database = require('../models/post.model')


route.get('/:id', (req, res) => {
    const {id} = req.params
    let match = false;
    for(let i = 0; i < database.Posts.length; i++){
    if(id == database.Posts[i].id){
    const entry = database.Posts[id]
   return res.json({status:"Success", data:entry})
    }
    }
    if(!match){
        return res.json({status:"Entry not found!!"})
    }
})









module.exports = route