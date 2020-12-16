//require express and database model
const express = require('express');
const database = require('../models/user.model')
const route = express.Router();
//signUp route
route.post('/signup', async(req, res)=>{
    const {firstname, lastname, username, email, password} = req.body
    let match = false
//loop through database, if req.body.email=== database.users[i].email return user already exist    
for(let i =0; i < database.users.length; i++){
  if(email === database.users[i].email){
    match = true
   return res.json({
      status: 400,
      message: "User Already Exist"
    })
  }
}
// if not , add new user to the end of the database array
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
module.exports = route

//pseudocode => SIGNUP ROUTE

// After user has input details to register , grab email and cross check with database , if emailMatch return 
// 'User already exist' : 'return welcome new user'