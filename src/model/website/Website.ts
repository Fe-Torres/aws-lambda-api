import * as Joi from 'joi';

export class Website {
  public url: string;

  constructor(url: string) {
    Website.validateUrl(url);
    this.url = url;
  }

  static validateUrl(url: string) {
    const urlSchema = Joi.string().required();

    const { error } = urlSchema.validate(url);

    if (error) {
      throw new Error('Invalid URL format');
    }
  }
}
