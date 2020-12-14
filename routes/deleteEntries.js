//Delete entry
const express = require('express')
const route = express.Router()
const database = require('../models/post.model')
//delete entryby Id
route.delete('/:id', (req, res) =>{
    let match = false
    const {id} = req.params
    //loop through dummydata
for(let i = 0; i < database.Posts.length; i++){
 //if req.params.id == database.Posts[i].id   
    if( id == database.Posts[i].id){
//return true        
        match = true
        database.Posts.splice(id, 1)
        return res.json({status:"success", message:'entry deleted'})
    }
}
if(!match){
    return res.json('Cannot delete entry')
}
})












module.exports = route