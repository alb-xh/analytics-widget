export class Validator {
  static InvalidValueError = class extends Error () {
    constructor (schemaName, issues) {
      super(`Invalid ${schemaName}: ${JSON.stringify(issues)}`);
    }
  }

  constructor (schemaName, schema) {
    this.schemaName = schemaName;
    this.schema = schema;
  }

  validate (value) {
    const result = Config.schema.safeParse(value);

    if (!result.success) {
      throw new Config.InvalidConfigError(result.error.issues);
    }
  }
}