import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PetResponseDto {
  @ApiProperty()
  @Expose()
  _id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  age: number;

  @ApiProperty()
  @Expose()
  gender: string;

  @ApiProperty()
  @Expose()
  type: string;

  @ApiProperty()
  @Expose()
  weight: number;

  @ApiProperty()
  @Expose()
  identityCard: string;

  @ApiProperty()
  @Expose()
  identityCardUrlToImage: string;
}