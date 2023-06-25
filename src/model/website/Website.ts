import * as Joi from 'joi';

export class Website {
  public url: string;

  constructor(url: string) {
    Website.validateUrl(url);
    this.url = url
  }

  static validateUrl(url: string) {
    const urlSchema = Joi.string().uri().required();

    try {
      Joi.valid(url, urlSchema);
      return;
    } catch (error) {
      throw new Error("Invalid url format");
    }
  }
}
