import { ApiProperty } from '@nestjs/swagger';

export class UpdateNewsfeedDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  urlToImages: string[];

  @ApiProperty()
  favouriteCount: number;

  @ApiProperty()
  commentCount: number;
}