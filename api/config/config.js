









 require('dotenv').config()
  
 const { Pool } = require('pg')
 const pool = new Pool({
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_DATABASE,
   password: process.env.DATABASE_PASSWORD,
   port: process.env.DB_PORT,
 })
 pool.on('connect', ()=>{
   console.log('connected to database')
 })
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res) 
//   pool.end() 
// })

 module.exports = pool