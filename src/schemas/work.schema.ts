export { WorkSchema };

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkDocument = Work & Document

@Schema({ collection: 'work' })
export class Work {
  @Prop() type: { type: string };
  @Prop() ref: string;
  @Prop() route: string;
  @Prop() title: string;
  @Prop() subtitle: string;
  @Prop() description: string;
  @Prop() license: [string];
  @Prop() repository: string;
  @Prop() languages: [string];
  @Prop() frameworks: [string];
  @Prop() tools: [string];
  @Prop() tags: [string];
  @Prop() dependency: string;
}

const WorkSchema = SchemaFactory.createForClass(Work);
