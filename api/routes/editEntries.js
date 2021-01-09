//Edit an entry by Id
const express =  require('express')
const route = express.Router();
const database = require('../models/post.model')


 route.patch('/:id', (req,res)=>{
 const {id} = req.params
 const {title, description} = req.body
 let match = false
 for(let i = 0; i < database.Posts.length; i++){
 if(id == database.Posts[i].id){
 match = true
 let updatedEntry = newFunction(i, id, title, description);
 return res.status(200).json({status:"Success entry successfully updated!", data:updatedEntry})
 }
 }
 if(!match){
   return res.status(404).json('Cannot find entry')
 }
 })





//  route.patch('/:id', (req,res)=>{
//  const {id} = req.params
//  const {title, description} = req.body
//  let match = false
//  for(let i = 0; i < database.Posts.length; i++){
//  if(id == database.Posts[i].id){
//  match = true
//  let updatedEntry = database.Posts[i].id
//   updatedEntry = ({id:id, title:title, description:description})
//   database.Posts.splice(id , 1, updatedEntry)
//  return res.json({status:"Success entry successfully updated!", data:updatedEntry})
//  }
//  }
//  if(!match){
//    return res.json('Cannot find entry')
//  }
//  })

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

function newFunction(i, id, title, description) {
  let updatedEntry = database.Posts[i].id;
  updatedEntry = ({ id: id, title: title, description: description });
  database.Posts.splice(id, 1, updatedEntry);
  return updatedEntry;
}
