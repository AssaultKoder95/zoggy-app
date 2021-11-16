const Joi = require("joi");

const addPaymentSchema = Joi.object({

  user: Joi.string().alphanum().min(7).required(),
  amount: Joi.number().integer().min(0).required(),

});

const editPaymentSchema = Joi.object({
  amount: Joi.number().integer().min(0).required(),
});




module.exports = {
  addPaymentSchema,
  editPaymentSchema,

};
