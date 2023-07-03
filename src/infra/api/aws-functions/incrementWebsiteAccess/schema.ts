import Joi from 'joi';

const schema = Joi.string()
  .uri({ allowRelative: false })
  .regex(/^(https?|http):\/\/[^ "]+$/)
  .required();

export default schema;
