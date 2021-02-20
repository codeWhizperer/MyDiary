const Joi = require('joi')

const validate = {
   
   login:(username, password) =>{
       const Schema = Joi.object({
           username: Joi.string().min(3).required(),
           password: Joi.string().min(5)
       })
return Schema.validate({username, password})
   },
   signup:(firstname, lastname ,username ,email , password) =>{
       const Schema = Joi.object({
           firstname: Joi.string().min(3).required(),
           lastname: Joi.string().min(3).required(),
           username: Joi.string().min(3).required(),
           email: Joi.string().min().required(),
           password: Joi.string().min(5).required()
       })
return Schema.validate({firstname, lastname , username, email, password})
   }   
}
module.exports = validate;