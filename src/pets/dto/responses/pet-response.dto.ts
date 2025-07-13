import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PetResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  age: number;

  @Expose()
  gender: string;

  @Expose()
  type: string;

  @Expose()
  weight: number;

  @Expose()
  identityCard: string;

  @Expose()
  identityCardUrlToImage: string;
}