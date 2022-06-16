import Joi from 'joi';

const schema = Joi.object({
  title: Joi.number().integer(),
  // postId: Joi.number().integer().required(),
  descriptionId: Joi.number().integer(),
  writer : Joi.string().max(40),
  // horsepower: Joi.number().integer().required(),
  

});

export default schema;
