const express = require('express')
const database = require('../models/user.model')
const route = express.Router();




route.post('/signin', async(req, res)=>{
    const {username, email, password} = req.body
    let match = false
for(let i =0; i < database.users.length; i++){
  if(email === database.users[i].email && password === database.users[i].password){
    match = true
   return res.json({
      status: "Success",
      message: `Welcome Back ${username}`
    })
  }
}
if(!match){
  return res.json({
    status: 400,
    message: "Invalid Entry"
  })
}
    
})


module.exports = route
