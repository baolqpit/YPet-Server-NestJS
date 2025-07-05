import { Prop, SchemaFactory } from '@nestjs/mongoose';

export type VideoDocument = Video & Document;

export class Video {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  url: string;

  @Prop()
  ownerId: string;

  @Prop()
  ownerAvatar: string;

  @Prop()
  ownerName: string;

  @Prop()
  commentCount: number;

  @Prop()
  favouriteCount: number;

  @Prop()
  viewCount: number;

  @Prop()
  createdDate: Date;
}
export const VideoSchema = SchemaFactory.createForClass(Video);
