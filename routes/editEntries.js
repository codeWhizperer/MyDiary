//Edit entry
const express =  require('express')
const route = express.Router();
const database = require('../models/post.model')

//edit entry
route.patch('/:id', (req,res)=>{
const {id} = req.params
const {title, description} = req.body
let match = false
//loop through dummydb
for(let i = 0; i < database.Posts.length; i++){
//if id == database.Posts[i].id
if(id == database.Posts[i].id){
//retutn true
match = true
//update = database.Posts[i].id
let updatedEntry = database.Posts[i].id
//set updateEntry to incoming input from frontend
 updatedEntry = ({id:id, title:title, description:description, createdOn:Date()})
 // get post by id , delete 1 , add to the array updatedEntry i.e .splice(start, deleteItem, addItem)
 database.Posts.splice(id , 1, updatedEntry)
return res.json({status:"Success entry successfully updated!", data:updatedEntry})
}
}
//if not match 
if(!match){
  return res.json('Cannot find entry')
}

})


// select id of array and equate it to data coming from frontend

// route.patch('/:id', (req,res)=>{
//   const {id} = req.params
//   const {title, description} = req.body
//   let match = false
//   for(let i = 0; i < database.Posts.length; i++){
//   if(database.Posts[i].id === id){
//   database.Posts.push({
//   id:id,
//   title:title,
//   description:description,
//   createdOn:Date()
//   })
//   return res.json({status:"success", message:"entry updated successfully",data:database.Posts})
//   }else{
//     res.json('err')
//   }
//   }

module.exports = route