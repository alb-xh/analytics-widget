export class Validator {
  static InvalidValueError = class extends Error {
    constructor (schemaName, issues, value) {
      super(`Invalid ${schemaName}: Issues: ${JSON.stringify(issues)}: Value: ${JSON.stringify(value)}`);
    }
  }

  constructor (schemaName, schema) {
    this.schemaName = schemaName;
    this.schema = schema;
  }

  validate (value) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new Validator.InvalidValueError(this.schemaName, result.error.issues, value);
    }
  }
}

