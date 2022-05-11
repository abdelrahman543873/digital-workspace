import { Repository } from '../interfaces/repository.interface';
import {
  Model,
  Document,
  FilterQuery,
  UpdateQuery,
  SaveOptions,
  QueryWithHelpers,
  AnyKeys,
} from 'mongoose';

export abstract class BaseRepository<T> implements Repository<T> {
  // creating a property to use your code in all instances
  // that extends your base repository and reuse on methods of class
  private _model: Model<T & Document>;

  // we created constructor with arguments to manipulate mongodb operations
  constructor(schemaModel: Model<T & Document>) {
    this._model = schemaModel;
  }

  async add(item: AnyKeys<T>): Promise<T & Document> {
    return await this._model.create(item);
  }

  async addMany(
    item: any[],
    options?: { ordered?: boolean; rawResult?: boolean },
  ): Promise<(T & Document)[]> {
    return await this._model.insertMany(item, options);
  }

  async rawDelete(): Promise<{ deletedCount?: number }> {
    return await this._model.deleteMany({});
  }

  deleteOne(filter): QueryWithHelpers<any, any> {
    return this._model.deleteOne(filter);
  }

  findOne(filter: FilterQuery<T>, projection?: any): QueryWithHelpers<T, T> {
    return this._model.findOne(filter, projection);
  }

  updateOne(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): QueryWithHelpers<any, T> {
    return this._model.findOneAndUpdate(filter, update, { new: true });
  }

  create(doc: AnyKeys<T>, options?: SaveOptions) {
    return this._model.create(doc, options);
  }
}
