import Joi from 'joi';
export function validateBody(schema) {
  return function (req, res, next) {
    try {
      
      Joi.assert(req.body, schema);
      next();
    } catch (err) {
      console.log('error', err);
     next(err);
      
    }
  };
}
export function validateQueryParams(schema) {
  return function (req, res, next) {
    try {
      Joi.assert(req.query, schema);
      next();
    } catch (err) {
      next(err);
      // res.status(400).json({
      //   message: 'Query params validation error',
      //   details: err.details.map((e) => e.message),
      // });
    }
  };
}
