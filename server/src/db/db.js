
import fs from 'node:fs/promises';
import readline from 'node:readline';
import logger from 'loglevel';

export class DB {
  constructor (path) {
    this.path = path;
  }

  async connect () {
    this.fd = await fs.open(this.path, 'a+');

    logger.info('Db connected');
  }

  async disconnect () {
    if (!this.fd) return;

    await this.fd.close();

    logger.info('Db disconnected');
  }

  async insert (row) {
    await this.fd.writeFile(JSON.stringify(row), { encoding: 'utf-8', flag: 'a' });
  }

  async find (filterCb, options = {}) {
    const { offset = 0, limit = Infinity } = options;

    return new Promise((resolve, reject) => {
      try {
        const results = [];

        const rl = readline.createInterface({
          input: this.fd.createReadStream(),
          crlfDelay: Infinity,
        })

        rl.on('line', (line) => {
          const row = JSON.parse(line);
          if (filterCb(row)) results.push(row);
        });

        rl.on('close', () => resolve(results.slice(offset, offset + limit)));
      } catch (err) {
        reject(err);
      }
    });
  }
}