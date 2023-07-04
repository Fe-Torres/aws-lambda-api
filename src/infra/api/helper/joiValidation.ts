import { Schema, ValidationResult } from 'joi';

export class JoiValidator {
  static validate(obj: unknown, schema: Schema): void {
    const result: ValidationResult = schema.validate(obj);
    if (result.error) {
      throw new Error(`Validation error: ${result.error.message}`);
    }
  }
}
