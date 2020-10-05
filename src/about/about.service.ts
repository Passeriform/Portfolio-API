import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { About, AboutDocument } from '../schemas/about.schema';

@Injectable()
export class AboutService {

  constructor(@InjectModel(About.name) private readonly AboutModel: Model<AboutDocument>) { }

  async fetch(subject: string): Promise<About> {
    return this.AboutModel.findOne({ 'subject': subject }).exec();
  }
}
