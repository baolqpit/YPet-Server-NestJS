import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiResponse } from '../common/helpers/api-response';
import { ResponseMessage } from '../common/enums/response-message.enum';
import { ResponseCode } from '../common/enums/response-code.enum';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/info')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@Request() req,) {
    const response = await this.usersService.findByPayload(req.user);

    return new ApiResponse(true, ResponseMessage.USER_FOUND, response, ResponseCode.SUCCESS);
  }
}
