import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Work, WorkDocument } from '../schemas/work.schema'

@Injectable()
export class WorkService {

  constructor(@InjectModel(Work.name) private readonly WorkModel: Model<WorkDocument>) { }

  fetchAll(): Promise<Array<Work>> {
    return this.WorkModel.find().exec();
  }

  fetch(ref: string): Promise<Work> {
    return this.WorkModel.findOne({ ref: ref }).exec();
  }

  fetchList(key: string): Promise<Array<any>> {
    return this.WorkModel.find().distinct(key).exec();
  }

  async fetchAndFilter(key: string, value: string): Promise<Array<Work>> {
    return this.WorkModel.find({ [key]: value }).exec();
  }
}
