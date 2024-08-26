import { ScriptData } from '../../components/script-data.component';

export class CollectionNameResolver {
  static resolve (collectionName) {
    const prefix = ScriptData.getPrefix();
    return prefix ? `${prefix}-${collectionName}` : collectionName;
  }
}
