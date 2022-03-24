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
  @Prop() img: string;
  @Prop() title: string;
  @Prop() description: string;
  @Prop() aboutUrl: string;
  @Prop() links: string;
}

@Schema()
export class TimeBlock {
  @Prop() img: string;
  @Prop() period: string;
  @Prop() entry: ParaBlock;
}

@Schema()
export class LinkBlock {
  @Prop({ type: String }) type: { type: string };
  @Prop() link: string;
}

@Schema()
export class Timeline {
  @Prop() timeline: [TimeBlock];
}

@Schema({ collection: 'about' })
export class About {
  @Prop() subject: string;
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
