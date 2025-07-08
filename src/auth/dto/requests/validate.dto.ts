import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateDto {
  @ApiProperty()
  @IsNotEmpty()
  accessToken: string;
}