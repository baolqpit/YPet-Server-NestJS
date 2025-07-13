import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type NewsfeedDocument = Document & {
  _id: Types.ObjectId;
} & Newsfeed;

@Schema()
export class Newsfeed {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  content: string;

  @Prop()
  authorAvatar: string;

  @Prop()
  authorName: string;

  @Prop()
  authorId: string;

  @Prop()
  urlToImages: string[];

  @Prop()
  publishedAt: Date;

  @Prop()
  createdDate: Date;

  @Prop()
  commentCount: number;

  @Prop()
  favouriteCount: number;
}

export const NewsfeedSchema = SchemaFactory.createForClass(Newsfeed);
