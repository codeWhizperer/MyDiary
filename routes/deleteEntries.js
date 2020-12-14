//Delete entry
const express = require('express')
const route = express.Router()
const database = require('../models/post.model')

route.delete('/:id', (req, res) =>{
    let match = false
    const {id} = req.params
for(let i = 0; i < database.Posts.length; i++){
    if( id == database.Posts[i].id){
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