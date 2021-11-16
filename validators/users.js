

const Joi = require("joi");


const addUserSchema = Joi.object({
  info: Joi.string().min(7).required(),
  user: Joi.string().min(7).required(),
  address: Joi.number().min(7).required(),
  password: Joi.number().min(7).required(),
  phone: Joi.number().min(7).required()
 
});

const editUserInfoSchema = Joi.object({
    info : Joi.string().min(7).required(),
  });
  
  const editUserPasswordSchema = Joi.object({
    password : Joi.string().min(7).required(),
  });


  module.exports = {  addUserSchema,
    editUserInfoSchema,
      editUserPasswordSchema
      }; 