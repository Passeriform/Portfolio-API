import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { About, AboutDocument } from '../schemas/about.schema';

@Injectable()
export class AboutService {

  constructor(@InjectModel(About.name) private readonly aboutModel: Model<AboutDocument>) { }

  fetchMany(selector?: string): Promise<About[]> {
    return this.aboutModel.find({}, selector?.split(",")?.join(" ") ?? "").exec();
  }

  fetch(subject: string, selector?: string): Promise<About> {
    return this.aboutModel.findOne({ 'subject': subject }, selector?.split(",")?.join(" ") ?? "" ).exec();
  }
}
