const { response, request } = require('express');
const pool = require('../config/config')


const getOne = async (request,response) =>{
    const findQuery= `SELECT * FROM diary WHERE id = $1 AND user_id = $2`;
    try {
        const {rows} = await pool.query(findQuery, [request.params.id, request.user.id]);
        if (!rows[0]) {
            return res.status(404).send({'message': 'reflection not found'});
          }
return response.status(200).json(rows[0])
        
    } catch (error) {
        if(error) return response.status(404).send({message: error})
    }
}


const getAll = async (request, response) => {
    const findQuery = `SELECT * FROM diary WHERE user_id = $1`;
    try {
        const {rows, rowCount} = await pool.query(findQuery, [request.user.id]);
        return response.status(200).send({rows, rowCount})
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
return response.status(201).send({data: data.rows[0], message: 'Entry Created Successfully!'});
       
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
    return response.status(200).send({message:data.rows[0]});
            
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

module.exports = {create, getAll, getOne, updateOne, deleteOne}




