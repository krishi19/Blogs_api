import Joi from 'joi';


const schema = Joi.object({
  id: Joi.number().integer(),
  title: Joi.string().max(200).required(),
  description: Joi.string().max(1500).required(),
  writer: Joi.string().required(),
  images: Joi.array(),
  // file: Joi.array().items(Joi.string())
});

export default schema;
