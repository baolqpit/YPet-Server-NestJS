import {
  Body,
  Controller,
  Get, Param,
  Post, Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NewsfeedService } from './newsfeeds.service';
import { Newsfeed } from './schemas/newsfeed.schema';
import { CreateNewsfeedDto } from './dto/requests/create-newsfeed.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiResponse } from '../common/helpers/api-response';
import { ResponseMessage } from '../common/enums/response-message.enum';
import { ResponseCode } from '../common/enums/response-code.enum';
import { UpdateNewsfeedDto } from './dto/requests/update-newsfeed.dto';

@ApiTags('Newsfeed')
@ApiBearerAuth('access-token')
@Controller('newsfeeds')
export class NewsfeedsController {
  constructor(private newsfeedService: NewsfeedService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() dto: CreateNewsfeedDto,
    @Request() req,
  ): Promise<ApiResponse> {
    const user = req.user;
    const payload = await this.newsfeedService.create(dto, user);

    return new ApiResponse(
      true,
      ResponseMessage.NEWSFEED_CREATED,
      payload,
      ResponseCode.CREATED,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<ApiResponse> {
    const result = await this.newsfeedService.findAll();

    return new ApiResponse(
      true,
      ResponseMessage.GET_NEWSFEED_SUCCESS,
      result,
      ResponseCode.SUCCESS,
    );
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<ApiResponse> {
    const result = await this.newsfeedService.findOne(id);

    return new ApiResponse(
      true,
      ResponseMessage.GET_NEWSFEED_SUCCESS,
      result,
      ResponseCode.SUCCESS,
    );
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async update(@Body() dto: UpdateNewsfeedDto, @Request() req: any): Promise<ApiResponse> {
    const result = await this.newsfeedService.update(req.user, dto);

    return new ApiResponse(
      true,
      ResponseMessage.UPDATED_NEWSFEED_SUCCESS,
      result,
      ResponseCode.SUCCESS,
    );
  }
}
