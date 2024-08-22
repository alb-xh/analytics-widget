import { z } from "zod";
import { collection, getDocs, setDoc } from 'firebase/firestore/lite';

import { Validator } from "../../components/validator.component";

export class BaseCollection {
  static collectionClassValidator = new Validator('CollectionClassSchema',  z.object({
    'Name': z.string().min(3),
    'Schema': z.object(),
  }));

  constructor (db) {
    BaseCollection.collectionClassValidator.validate(this.constructor);

    this.instanceValidator = new Validator(`${this.constructor.Name} Schema`, this.constructor.Schema);
    this.collection = collection(db, this.constructor.name);
  }

  async find (query) {
    const res = await getDocs(this.collection, query);
    const data = res.docs.map(doc => doc.data());

    return data;
  }

  async insert (data) {
    this.instanceValidator.validate(data);

    await setDoc(this.collection, data);
  }
}