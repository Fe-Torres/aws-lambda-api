import Joi from 'joi';

const schema = Joi.string().required().uri();

export default schema ;
