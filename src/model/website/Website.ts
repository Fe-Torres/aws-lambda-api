import * as Joi from 'joi';
import { InvalidDataError } from '../../main/errors/invalidDataError';

export class Website {
  public url: string;

  constructor(url: string) {
    Website.validateUrl(url);
    this.url = url;
  }

  static validateUrl(url: string) {
    const urlSchema = Joi.string()
      .uri({ allowRelative: false })
      .regex(/^(https?|http):\/\/[^ "]+$/)
      .required();

    const { error } = urlSchema.validate(url);

    if (error) {
      throw new InvalidDataError('Website');
    }
  }
}
