//require express and database model
const express = require('express');
const database = require('../models/user.model')
const route = express.Router();
const bcrypt = require('bcrypt');


route.post("/signup", async (req,res) => {
const {firstname, lastname, username, email, password} = req.body;
const data = database.users.find((user) => email === user.email)
if(data){
  return res.json({status:400, message: "User Already Exist"})
}
if(!data){
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)
  database.users.push({firstname:firstname, lastname:lastname, username:username, email:email,password:passwordHash})
 return res.json({status:"Success", message:"User successfully Registered!"})
}
})

module.exports = route

//pseudocode => SIGNUP ROUTE

// After user has input details to register , grab email and cross check with database , if emailMatch return 
// 'User already exist' : 'return welcome new user'