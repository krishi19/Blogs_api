import Joi from 'joi';


const schema = Joi.object({
  // postId: Joi.number().integer().required(),
  id: Joi.number().integer(),
  title: Joi.string().max(200).required(),
  description: Joi.string().max(1500).required(),
  // Joi.string()
  image: Joi.array().items(Joi.string())
});

export default schema;
