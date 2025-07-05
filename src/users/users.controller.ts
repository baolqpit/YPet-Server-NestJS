import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseUserDto } from './dto/responses/response-user.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { RequestUserDto } from './dto/requests/request-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: ResponseUserDto })
  async create(@Body() user: RequestUserDto): Promise<ResponseUserDto> {
    return this.usersService.create(user);
  }
}
