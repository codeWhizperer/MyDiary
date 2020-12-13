const express = require('express');
const database = require('../models/user.model')
const route = express.Router();





route.post('/signup', async(req, res)=>{
    const {firstname, lastname, username, email, password} = req.body
    let match = false
for(let i =0; i < database.users.length; i++){
  if(email === database.users[i].email){
    match = true
   return res.json({
      status: 400,
      message: "User Already Exist"
    })
  }
}
if(!match){
  database.users.push({
    firstname:firstname,
    lastname:lastname,
    username:username,
    email:email,
    password:password
  })
  return res.json({
    status: "Success",
    message: "User Created Successfully"
  })
}
    
})

//pseudocode => SIGNUP ROUTE

// After user has input details to register , grab email and cross check with database , if emailMatch return 
// 'User already exist' : 'return welcome new user'
module.exports = route