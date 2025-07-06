import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseUserDto } from './dto/responses/response-user.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateUserDto} from './dto/requests/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
