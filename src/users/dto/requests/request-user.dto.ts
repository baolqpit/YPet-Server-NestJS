import { ApiProperty } from '@nestjs/swagger';

export class RequestUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  background: string;
}
