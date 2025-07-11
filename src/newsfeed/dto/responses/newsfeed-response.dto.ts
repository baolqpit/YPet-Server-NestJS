import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class NewsfeedResponseDto {
  @ApiProperty()
  @Expose()
  _id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  content: string;

  @ApiProperty()
  @Expose()
  author: string;

  @ApiProperty()
  @Expose()
  authorAvatar: string;

  @ApiProperty()
  @Expose()
  authorName: string;

  @ApiProperty()
  @Expose()
  authorId: string;

  @ApiProperty()
  @Expose()
  urlToImages: string[];

  @ApiProperty()
  @Expose()
  publishedAt: Date;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  commentCount: number;

  @ApiProperty()
  @Expose()
  favouriteCount: number;
}