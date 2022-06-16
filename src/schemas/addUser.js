import Joi from 'joi';


const schema = Joi.object({
  // postId: Joi.number().integer().required(),
  email: Joi.string().email().max(50).required(),
 name: Joi.string().max(50).required(),
 password : Joi.string().max(20)
});

export default schema;