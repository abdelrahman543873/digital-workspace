import { FilterQuery, Document } from 'mongoose';

export interface Repository<T> {
  rawDelete();
  add(item: T);
  addMany(items: T[]);
  findOne(filter: FilterQuery<T & Document<any>>);
}
