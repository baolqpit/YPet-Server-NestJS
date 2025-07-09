import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';

export class CreatePetDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  identityCard: string;

  @ApiProperty()
  identityCardUrlToImage: string;
}