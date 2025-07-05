import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type NewsfeedDocument = Newsfeed & Document;

@Schema()
export class Newsfeed {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  content: string;

  @Prop()
  author: string;

  @Prop()
  authorAvatar: string;

  @Prop()
  authorName: string;

  @Prop()
  authorId: string;

  @Prop()
  urlToImage: string;

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
