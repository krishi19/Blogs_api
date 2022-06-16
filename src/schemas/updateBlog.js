import Joi from 'joi';

const schema = Joi.object({
    title: Joi.number().integer().optional(),
    description: Joi.number().integer(),
  images: Joi.object({
    added: Joi.array().items(Joi.string()).optional(),
    removed: Joi.array().items(Joi.string()).optional()
  }).optional()
});

export default schema;