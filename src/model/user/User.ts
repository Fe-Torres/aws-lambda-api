import * as Joi from 'joi';
import { InvalidDataError } from '../../main/errors/invalidDataError';

export class User {
  id: string;
  name: string;
  age: number;
  email: string;

  constructor(id: string, name: string, age: number, email: string) {
    const { error } = User.validateInput(id, name, age, email);
    if (error) {
      throw new InvalidDataError('User');
    }
    this.id = id;
    this.name = name;
    this.age = age;
    this.email = email;
  }

  private static validateInput(
    id: string,
    name: string,
    age: number,
    email: string
  ) {
    const schema = Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      age: Joi.number().integer().positive().required(),
      email: Joi.string().email().required(),
    });

    return schema.validate({ id, name, age, email });
  }
}
