const { response, request } = require('express');
const pool = require('../configuration/config')


const getOne = async (request,response) =>{
    const findQuery= `SELECT * FROM diary WHERE id = $1 AND user_id = $2`;
    try {
        const {rows} = await pool.query(findQuery, [request.params.id, request.user.id]);
        if (!rows[0]) {
            return res.status(404).send({'message': 'Entry not found'});
          }
return response.status(200).json(rows[0])
        
    } catch (error) {
        if(error) return response.status(404).send({message: error})
    }
}


const getAll = async (request, response) => {
    const findQuery = `SELECT * FROM diary WHERE user_id = $1`;
    const requests = await pool.query(findQuery, [request.user.id])
    try {
        if(!requests.rows.length) return response.status(200).json({message:"No Response"})
        // const {rows, rowCount} = await pool.query(findQuery, [request.user.id]);
         return response.status(200).json({request:requests.rows , message: "Here are your entry"})
    } catch (error) {
        if(error){
          return   response.status(404).send(error);
        }
    }
}


const create = async (request, response) =>{
    const createQuery = `INSERT INTO diary(title, description, user_id) VALUES($1, $2, $3) RETURNING *`;
    const values = [request.body.title, request.body.description, request.user.id];
    try {
       const data = await pool.query(createQuery, values);
return response.status(201).json({data: data.rows[0], message: 'Entry Created Successfully!'});
       
    } catch (error) {
        if(error){
            return response.status(400).send(error);
        }
    }
    }



    const updateOne = async (request, response) =>{
        const findQuery = `SELECT * FROM diary WHERE id = $1 AND user_id = $2 `;
        const updateQuery = `UPDATE diary SET title = $1, description = $2 WHERE id =$3 AND user_id = $4 RETURNING *`;
        try {
            const {rows} = await pool.query(findQuery, [request.params.id, request.user.id]);
            if(!rows[0]){
                return response.status(404).send({message: 'Diary entry not found!'})
            }
            const values = [request.body.title, request.body.description, request.params.id, request.user.id];
    const data = await pool.query(updateQuery, values);
    return response.status(200).send({info: 'entry successfully updated', message:data.rows});
            
        } catch (error) {
            if(error){
                response.status(404).json({message: error})
            }
        }
    }

    const deleteOne = async (request, response) =>{
        const deleteQuery = `DELETE  FROM diary WHERE id =$1 AND user_id = $2 RETURNING *`;
        try {
            const {rows, rowCount} = await pool.query(deleteQuery, [request.params.id, request.user.id]);
            if(!rows[0]){
                return response.status(404).send({message: 'diary entry not found'})
            }
            return response.status(200).send({message: rows, rowCount})
        } catch (error) {
            if(error){
                return response.status(404).send({message: error})
            }
        }
    }

    const updateProfile = async(request, response) =>{
        const findQuery = `SELECT * FROM users WHERE id= $1`
        const id = request.params.id;
        try {
            const formerProfile = await pool.query(findQuery, [id])
            if(!formerProfile.rows.length){
                return response.status(404).json({message:'User not found'})
            }

            const formerProfileToUpdate = formerProfile.rows[0];
            console.log(formerProfile.rows.length)
            const username = request.body.username || formerProfileToUpdate.username;
            const email = request.body.email || formerProfileToUpdate.email;
            const updatequery = `UPDATE users SET username = $1, email= $2 WHERE id= $3 RETURNING *`
            const values = [username, email, id]
            const newProfile = await pool.query(updatequery,values)
            return response.status(200).json({data:newProfile.rows, message:"Profile Successfully updated"})
        } catch (error) {
            return response.status(404).json({message: error})
        }

    }

module.exports = {create, getAll, getOne, updateOne, deleteOne, updateProfile}




