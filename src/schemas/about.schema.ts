export {
  AboutSchema,
  TimelineSchema,
  TimeBlockSchema,
  LinkBlockSchema,
  PopupBlockSchema,
  ParaBlockSchema
};

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AboutDocument = About & Document

@Schema()
export class ParaBlock {
  @Prop() img: string;
  @Prop() heading: string;
  @Prop() paragraph: string;
}

@Schema()
export class PopupBlock {
  @Prop() img: String;
  @Prop() title: String;
  @Prop() description: String;
  @Prop() aboutUrl: String;
  @Prop() links: String;
}

@Schema()
export class TimeBlock {
  @Prop() img: String;
  @Prop() period: String;
  @Prop() entry: ParaBlock;
}

@Schema()
export class LinkBlock {
  @Prop() type: { type: String };
  @Prop() link: String;
}

@Schema()
export class Timeline {
  @Prop() timeline: [TimeBlock];
}

@Schema({ collection: 'about' })
export class About {
  @Prop() subject: String;
  @Prop() intro: ParaBlock;
  @Prop() overview: [ParaBlock];
  @Prop() story: Timeline;
  @Prop() contact: ParaBlock;
}

const AboutSchema = SchemaFactory.createForClass(About);
const TimelineSchema = SchemaFactory.createForClass(Timeline);
const TimeBlockSchema = SchemaFactory.createForClass(TimeBlock);
const LinkBlockSchema = SchemaFactory.createForClass(LinkBlock);
const PopupBlockSchema = SchemaFactory.createForClass(PopupBlock);
const ParaBlockSchema = SchemaFactory.createForClass(ParaBlock);
