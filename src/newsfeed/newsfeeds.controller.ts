import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { NewsfeedService } from './newsfeeds.service';
import { Newsfeed } from './schemas/newsfeed.schema';
import { CreateNewsfeedDto } from './dto/requests/create-newsfeed.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Newsfeed')
@ApiBearerAuth('access-token')
@Controller('newsfeeds')
export class NewsfeedsController {
  constructor(private newsfeedService: NewsfeedService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateNewsfeedDto, @Request() req): Promise<Newsfeed> {
    const user = req.user;
    return this.newsfeedService.create(dto, user);
  }
}
