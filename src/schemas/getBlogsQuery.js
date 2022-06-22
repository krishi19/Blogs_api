import Joi from 'joi';

const schema = Joi.object({
  title: Joi.number().integer(),
  descriptionId: Joi.number().integer(),
  writer : Joi.string().max(150),
});

export default schema;
