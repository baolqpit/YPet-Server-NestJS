import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/requests/create-user.dto';
import { ApiResponse } from '../common/helpers/api-response';
import { LoginDto } from './dto/requests/login.dto';
import { ResponseMessage } from '../common/enums/response-message.enum';
import { ResponseCode } from '../common/enums/response-code.enum';
import { ValidateDto } from './dto/requests/validate.dto';
import { RefreshDto } from './dto/requests/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const result = await this.authService.register(dto);
    return new ApiResponse(
      true,
      ResponseMessage.REGISTER_SUCCESS,
      result,
      ResponseCode.SUCCESS,
    );
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto);
    return new ApiResponse(
      true,
      ResponseMessage.LOGIN_SUCCESS,
      result,
      ResponseCode.SUCCESS,
    );
  }

  @Post('validate')
  async validateToken(@Body() dto: ValidateDto) {
    const payload = await this.authService.validateToken(dto.accessToken);
    return new ApiResponse(
      true,
      ResponseMessage.TOKEN_VALID,
      payload,
      ResponseCode.SUCCESS,
    );
  }

  @Post('refresh-token')
  async refreshToken(@Body() dto: RefreshDto) {
    const accessToken = await this.authService.refreshAccessToken(
      dto.refreshToken,
    );
    return new ApiResponse(
      true,
      ResponseMessage.NEW_ACCESS_TOKEN,
      { accessToken },
      ResponseCode.SUCCESS,
    );
  }
}
