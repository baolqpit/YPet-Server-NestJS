import { Body, Controller, Post } from '@nestjs/common';
import { NewsfeedService } from './newsfeeds.service';
import { Newsfeed } from './schemas/newsfeed.schema';

@Controller('newsfeeds')
export class NewsfeedsController {
  constructor(private newsfeedService: NewsfeedService) {}

  @Post()
  create(@Body() newsfeed: Newsfeed): Promise<Newsfeed> {
    return this.newsfeedService.create(newsfeed);
  }
}
