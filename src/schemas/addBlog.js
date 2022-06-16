import Joi from 'joi';


const schema = Joi.object({
  // postId: Joi.number().integer().required(),
  id: Joi.number().integer(),
  title: Joi.string().max(20).required(),
  description: Joi.string().max(500).required(),
  // Joi.string()
  images: Joi.array().items(Joi.string())
});

export default schema;
