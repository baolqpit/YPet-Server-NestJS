import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Newsfeed, NewsfeedDocument } from './schemas/newsfeed.schema';
import { CreateNewsfeedDto } from './dto/requests/create-newsfeed.dto';
import { NewsfeedResponseDto } from './dto/responses/newsfeed-response.dto';
import { plainToInstance } from 'class-transformer';
import { ApiResponse } from '@nestjs/swagger';

@Injectable()
export class NewsfeedService {
  constructor(
    @InjectModel(Newsfeed.name) private newsfeedModel: Model<NewsfeedDocument>,
  ) {}

  async create(dto: CreateNewsfeedDto, userPayload: any) {
    const newsfeed = new this.newsfeedModel({
      ...dto,
      authorId: userPayload.sub,
      authorAvatar: userPayload.avatar,
      authorName: userPayload.name,
      createdAt: new Date(),
      commentCount: 0,
      favouriteCount: 0,
    });

    return plainToInstance(NewsfeedResponseDto, (await newsfeed.save()).toObject(), {
      excludeExtraneousValues: true,
    });

  }

  async findAll(): Promise<NewsfeedResponseDto[]> {
    const result = await this.newsfeedModel.find().sort({ createdAt: -1 }).exec();
    return plainToInstance(NewsfeedResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
