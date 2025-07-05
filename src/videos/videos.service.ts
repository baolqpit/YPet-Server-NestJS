import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from './schemas/video.schema';
import { Model } from 'mongoose';

@Injectable()
export class VideosService {
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

  create(data: Partial<Video>) {
    const createdVideo = new this.videoModel(data);
    return createdVideo.save();
  }
}
