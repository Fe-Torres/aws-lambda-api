import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().required(),
  email: Joi.string().email().required(),
}).required();

export default schema;
