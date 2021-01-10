//Signin route
const express = require('express')
const database = require('../models/user.model')
const route = express.Router();
const bcrypt = require("bcrypt")

route.post('/signin', async (req, res) => {
    const {username, email, password} = req.body
    let match = false;
for(let i = 0; i < database.users.length; i++){
const usermail = database.users[i].email 
const db = database.users[i].password
if(email === usermail && await bcrypt.compare(password, db)){
    match = true
    return res.status(200).json({status:"Success", message:`Welcome back ${username}`})
}
}
 if(!match){
     return res.status(400).json({message:"Invalid, Try Again"})
 }
})


module.exports = route

// check if incoming email === database.users.email
// if true , compare password to database.password(bcrypt.compare =>true|| false)
