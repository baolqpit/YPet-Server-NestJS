import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class NewsfeedResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  content: string;

  @Expose()
  author: string;

  @Expose()
  authorAvatar: string;

  @Expose()
  authorName: string;

  @Expose()
  authorId: string;

  @Expose()
  urlToImages: string[];

  @Expose()
  publishedAt: Date;

  @Expose()
  createdDate: Date;

  @Expose()
  commentCount: number;

  @Expose()
  favouriteCount: number;
}