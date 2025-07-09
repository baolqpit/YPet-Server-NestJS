import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsfeedDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  urlToImages: string[];
}