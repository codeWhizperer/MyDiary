const pool = require('../configuration/config')
const  jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = async (request, response, next) =>{
const token = request.headers['x-access-token']
if(!token){
    return response.status(403).json({message:'Unathorized!'});
}
try {
    const decoded = await jwt.verify(token , process.env.TOKEN_SECRET);
    const text = 'SELECT * FROM users WHERE id = $1';
    const {rows} = await pool.query(text, [decoded.userId]);
    if(!rows[0]){
        return response.status(400).status({message: 'Token id invalid'})
    }
     request.user = { id: decoded.userId };
    
    next();
    
} catch (error) {
    return response.status(404).json({message: error})
}

}
module.exports = {verifyToken}