import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNewsfeedResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  description: string;

  @Expose()
  urlToImages: string[];

  @Expose()
  favouriteCount: number;

  @Expose()
  commentCount: number;

  @Expose()
  updatedById: string;

  @Expose()
  updatedAt: Date;
}