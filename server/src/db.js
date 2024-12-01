import fs from 'node:fs/promises';

export class DB {
  constructor (path) {
    this.path = path;
  }

  async insert (row) {
    await fs.writeFile(this.path, JSON.stringify(row) + '\n', { encoding: 'utf-8', flag: 'a' });
  }

  async find (filterCb, options = {}) {
    const { offset = 0, limit = Infinity } = options;
    const results = [];

    const fd = await fs.open(this.path, 'w+');

    for await (const line of fd.readLines()) {
      const row = JSON.parse(line);
      if (filterCb(row)) results.push(row);
    }

    await fd.close();

    return results.slice(offset, offset + limit);
  }
}