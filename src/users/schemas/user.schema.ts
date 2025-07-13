import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = Document & {
  _id: Types.ObjectId;
} & User;

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop()
  password: string;

  @Prop()
  address: string;

  @Prop()
  avatar: string;

  @Prop()
  background: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
