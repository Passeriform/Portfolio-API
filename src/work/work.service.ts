import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Work, WorkDocument } from '../schemas/work.schema'

@Injectable()
export class WorkService {

  constructor(@InjectModel(Work.name) private readonly workModel: Model<WorkDocument>) { }

  fetchMany(selector: string): Promise<Work[]> {
    return this.workModel.find({}, selector?.split(",")?.join(" ") ?? "").exec();
  }

  fetch(ref: string): Promise<Work> {
    return this.workModel.findOne({ ref: ref }).exec();
  }

  fetchPropertyValues(property: string): Promise<any[]> {
    return this.workModel.find().distinct(property).exec();
  }
}
