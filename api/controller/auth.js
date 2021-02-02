const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const pool = require('../config/config');
const validate = require('../middlewares/auth.validation')
require('crypto').randomBytes(64).toString('hex')
require('dotenv').config()


const signup = async  (request, response)=>{
    try {
        //1. destructure req.body
    const {firstname, lastname, username, email, password} = request.body;
    if(!username || !password){
        return response.status(400).json({message: 'Some values are missing'})
    }
    //2. validate user input
    const validationError = validate.signup(firstname,lastname,username, email, password)
if(validationError.message){
    return response.status(400).json({status:'Validation Error', message: validationError.message})
}
//3. check if user exist (if user exist , throw err)
const userExist = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
if(userExist.rows.length !== 0){
    return response.status(401).json({message: "User Already Exist"})
}
// 4. hash user password
const salt = await bcrypt.genSalt(10)
const hashPassword = await bcrypt.hash(password, salt)
//5. Insert user into db
const newUser = await pool.query('INSERT INTO users (firstname, lastname, username, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *', [firstname, lastname, username,email, hashPassword]);
// 6. generate jwt token
return jwt.sign({userId: newUser.rows[0].id},
     process.env.TOKEN_SECRET,
      {expiresIn: '7days'}, (error, token)=>{
          if(error){
              return response.status(401).json({message:error})
          }
          return response.status(201).json({user:newUser.rows, message:'User Register Successfully', token})
      })

} catch (error) {
    response.status(500).send({message:error})
}

}

const login = async (request, response) =>{
    try {
        // 1. destructure request body
        const {username,  password } = request.body;
        if(!username || !password){
            return response.status(400).json({message: 'Some values are missing'})
        }
        //2.  validate user input
        const validationError = validate.login(username, password)
        if(validationError.message){
            return response.status(400).json({status:'Validation Error', message: validationError.message})
        }
        // 3. check if user exist
const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        // 4. compare password
if(user.rows.length === 0){
    return response.status(401).json({message:'Username or Password Incorrect.'})
}       
const validPassword = await bcrypt.compare(password, user.rows[0].password)
if(!validPassword){
return response.status(404).json({message:'Username or Password Incorrect.'})
}

// 5. jwt
jwt.sign({userId:user.rows[0].id}, process.env.TOKEN_SECRET, {expiresIn: '7days'},(error, token)=>{
if(error){
    return response.status(400).json({message: error})
}
return response.status(200).json({message:'User Successfully Logged In', info:token})
})
        
    } catch (error) {
        if(error){
            return response.status(400).json({message:error})
        }
    }
}





module.exports = {signup, login}