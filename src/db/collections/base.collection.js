import { z } from "zod";
import { collection, getDocs, addDoc, getDoc, doc, updateDoc } from 'firebase/firestore/lite';

import { Validator } from "../../components/validator.component";
import { Logger } from "../../components/logger.component";

// Add more base methods
export class BaseCollection {
  static collectionClassValidator = new Validator('CollectionClassSchema',  z.object({
    'Name': z.string().min(3),
    'Schema': z.object({}),
  }));

  constructor (db) {
    BaseCollection.collectionClassValidator.validate({ ...this.constructor });

    this.instanceValidator = new Validator(`${this.constructor.Name} Schema`, this.constructor.Schema);
    this.collection = collection(db, this.constructor.Name);
  }

  async findById (id) {
    Logger.debug(this.constructor.name, 'findById', id);

    const res = await getDoc(doc(this.collection, id));

    return res.exists() ? { id: res.id, ...res.data() } : null;
  }

  async find (query) {
    Logger.debug(this.constructor.name, 'find');

    const res = await getDocs(this.collection, query);
    const data = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return data;
  }

  async findOne (query) {
    Logger.debug(this.constructor.name, 'findOne');

    const data = await this.find(query);

    return data[0];
  }

  async exists (query) {
    Logger.debug(this.constructor.name, 'exists');

    const res = await this.findOne(query);

    return res ? true : false;
  }

  async insert (data) {
    Logger.debug(this.constructor.name, 'insert', data);

    this.instanceValidator.validate(data);

    await addDoc(this.collection, data);
  }

  // Only full updates for now
  async update (id, data) {
    Logger.debug(this.constructor.name, 'update', id, data);

    this.instanceValidator.validate(data);

    await updateDoc(doc(this.collection, id), data);
  }
}