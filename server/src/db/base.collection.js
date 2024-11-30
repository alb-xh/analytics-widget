export class BaseCollection {
  constructor (name, schema, db) {
    this.name = name;
    this.schema = schema;
    this.db = db;
  }

  validate (entry) {
    const { success, error } = this.schema.safeParse(entry);

    if (!success) {
      throw Error(`${this.name} collection: Invalid entry: ${JSON.stringify(error.issues)}`);
    }
  }

  async insert (entry) {
    this.validate(entry);
    await this.db.insert({ ...entry, collection: this.name });
  }

  async find (filterCb, options) {
    const entries = await this.db.find((entry) => entry.collection === this.name && filterCb(entry), options);
    return entries.map(({ collection, ...entry }) => entry);
  }
}
