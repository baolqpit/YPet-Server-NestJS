import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(11)
  phoneNumber: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  background: string;
}
