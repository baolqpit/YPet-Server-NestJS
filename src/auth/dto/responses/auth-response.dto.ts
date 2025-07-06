import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ResponseUserDto } from '../../../users/dto/responses/response-user.dto';

export class AuthResponse {
  @ApiProperty()
  @Expose()
  user: ResponseUserDto;

  @ApiProperty()
  @Expose()
  accessToken: string;

  @ApiProperty({ required: false })
  @Expose()
  refreshToken: string;
}
