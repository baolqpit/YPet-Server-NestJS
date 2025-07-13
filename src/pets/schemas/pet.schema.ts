import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type PetDocument = Document & {
  _id: Types.ObjectId;
} & Pet;

/* MongoDB sẽ tự chuyển tên class thành pets khi schema được tạo.
Nếu muốn thay đổi, chỉnh sửa lại @Schema({collection: 'table_name'}) */
@Schema()
export class Pet {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  type: string;

  @Prop()
  weight: number;

  @Prop()
  identityCard: string;

  @Prop()
  identityCardUrlToImage: string;
}
export const PetSchema = SchemaFactory.createForClass(Pet);
