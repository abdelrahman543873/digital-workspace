import { Repository } from '../interfaces/repository.interface';
import {
  Model,
  Document,
  FilterQuery,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';

export abstract class BaseRepository<T> implements Repository<T> {
  // creating a property to use your code in all instances
  // that extends your base repository and reuse on methods of class
  private _model: Model<T & Document>;

  // we created constructor with arguments to manipulate mongodb operations
  constructor(schemaModel: Model<T & Document>) {
    this._model = schemaModel;
  }

  async add(item: T): Promise<T & Document> {
    return await this._model.create(item);
  }

  async addMany(item: T[]): Promise<Array<T & Document>> {
    return await this._model.insertMany(item);
  }

  async rawDelete(): Promise<{ deletedCount?: number }> {
    return await this._model.deleteMany({});
  }

  async findOne(filter: FilterQuery<T & Document<any>>): Promise<T> {
    return await this._model.findOne(filter);
  }
  async updateOne(
    filter: FilterQuery<T & Document<any>>,
    update: UpdateQuery<T & Document<any, any>>,
  ): Promise<Record<any, any>> {
    return await this._model.updateOne(filter, update);
  }
}
