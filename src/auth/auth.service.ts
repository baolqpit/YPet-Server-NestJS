import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/requests/create-user.dto';
import { AuthResponse } from './dto/responses/auth-response.dto';
import { LoginDto } from './dto/requests/login.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from '../users/dto/responses/response-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto): Promise<AuthResponse> {
    const user = await this.userService.create(dto);
    const token = this.jwtService.sign({ sub: user._id, email: user.email });

    return plainToInstance(AuthResponse, {
      user,
      token,
    });
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const userDoc = await this.userService.findByEmail(dto.email);

    if (!userDoc || !(await bcrypt.compare(dto.password, userDoc.password))) {
      // throw new UnauthorizedException('Invalid Credentials');
      throw new UnauthorizedException();
    }

    const user = plainToInstance(ResponseUserDto, userDoc, {
      excludeExtraneousValues: true,
    });

    const token = this.jwtService.sign({
      sub: user._id,
      email: user.email,
    });

    return plainToInstance(AuthResponse, {
      user,
      token,
    });
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
