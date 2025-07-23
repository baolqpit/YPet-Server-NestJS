import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type NewsfeedLikeDocument = NewsfeedLike & Document;

@Schema({ timestamps: true })
export class NewsfeedLike {
  @Prop({ type: Types.ObjectId, ref: 'Newsfeed', required: true })
  newsfeedId: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;
}

export const NewsfeedLikeSchema = SchemaFactory.createForClass(NewsfeedLike);