import { Body, Controller, Post } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video } from './schemas/video.schema';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoServices: VideosService) {}

  @Post()
  create(@Body() body: Partial<Video>) {
    return this.videoServices.create(body);
  }
}
