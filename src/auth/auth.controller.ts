import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/requests/create-user.dto';
import { ApiResponse } from '../common/helpers/api-response';
import { LoginDto } from './dto/requests/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const result = await this.authService.register(dto);
    return new ApiResponse(true, 'User registered successfully.', result, 201);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto);
    return new ApiResponse(true, 'Login successful', result, 200);
  }
}
