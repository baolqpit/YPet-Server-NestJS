import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/requests/create-user.dto';
import { AuthResponse } from './dto/responses/auth-response.dto';
import { LoginDto } from './dto/requests/login.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from '../users/dto/responses/response-user.dto';
import { ResponseError } from '../common/enums/response-error.enum';
import * as process from 'node:process';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService
  ) {}

  async register(dto: CreateUserDto): Promise<AuthResponse> {
    const emailExists = await this.userService.findByEmail(dto.email);
    if (emailExists) {
      throw new ConflictException(ResponseError.EMAIL_ALREADY_EXISTS);
    }

    const user = await this.userService.create(dto);

    const payload = { sub: user._id, email: user.email };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.config.get<string>('JWT_ACCESS_EXPIRATION'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRATION'),
    });

    return plainToInstance(AuthResponse, {
      user,
      accessToken,
      refreshToken,
    });
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const userDoc = await this.userService.findByEmail(dto.email);

    ///Email user chưa tồn tại trong hệ thống
    if (!userDoc) {
      throw new UnauthorizedException(ResponseError.USER_NOT_FOUND);
    }

    const passwordMatched = await bcrypt.compare(
      dto.password,
      userDoc.password,
    );

    ///Thông tin đăng nhập sai
    if (!passwordMatched) {
      throw new UnauthorizedException(ResponseError.INVALID_CREDENTIALS);
    }

    const user = plainToInstance(ResponseUserDto, userDoc, {
      excludeExtraneousValues: true,
    });

    const payload = {
      sub: user._id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.config.get<string>('JWT_ACCESS_EXPIRATION'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRATION'),
    });

    return plainToInstance(AuthResponse, {
      user,
      accessToken,
      refreshToken,
    });
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
    } catch {
      throw new UnauthorizedException(ResponseError.TOKEN_INVALID);
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const newAccessToken = this.jwtService.sign(
        { sub: payload.sub, email: payload.email },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: process.env.JWT_ACCESS_EXPIRATION,
        },
      );

      return newAccessToken;
    } catch (e) {
      throw new UnauthorizedException(ResponseError.REFRESH_TOKEN_INVALID);
    }
  }
}
