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

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto): Promise<AuthResponse> {
    const emailExists = await this.userService.findByEmail(dto.email);
    if (emailExists) {
      throw new ConflictException(ResponseError.EMAIL_ALREADY_EXISTS);
    }

    const user = await this.userService.create(dto);
    const token = this.jwtService.sign({ sub: user._id, email: user.email });

    return plainToInstance(AuthResponse, {
      user,
      token,
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
