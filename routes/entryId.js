//entry by :id
const express = require('express')
const route = express.Router()
const database = require('../models/post.model')

//Get entry by Id
route.get('/:id', (req, res) => {
    const {id} = req.params
    let match = false;
 //loop through dummydb   
    for(let i = 0; i < database.Posts.length; i++){
    if(id == database.Posts[i].id){
//get entry by id and saved into variable 'entry'        
    const entry = database.Posts[id]
 //return   status, data
   return res.json({status:"Success", data:entry})
    }
    }
    if(!match){
        return res.json({status:"Entry not found!!"})
    }
})









module.exports = route