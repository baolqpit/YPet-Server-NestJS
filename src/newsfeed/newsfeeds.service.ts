import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Newsfeed, NewsfeedDocument } from './schemas/newsfeed.schema';
import { CreateNewsfeedDto } from './dto/requests/create-newsfeed.dto';
import { NewsfeedResponseDto } from './dto/responses/newsfeed-response.dto';
import { plainToInstance } from 'class-transformer';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseError } from '../common/enums/response-error.enum';
import { ResponseCode } from '../common/enums/response-code.enum';

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
      createdDate: new Date(),
      publishedAt: new Date(),
      commentCount: 0,
      favouriteCount: 0,
    });

    const savedNewsfeed = await newsfeed.save();

    const plainNewsfeed = {
      ...savedNewsfeed.toObject(),
      id: savedNewsfeed._id.toString(),
    };

    console.log('Created newsfeed: ', plainNewsfeed);

    return plainToInstance(NewsfeedResponseDto, plainNewsfeed, {
      excludeExtraneousValues: true,
    });

  }

  async findAll(): Promise<NewsfeedResponseDto[]> {
    const result = await this.newsfeedModel.find().sort({ createdDate: -1 }).exec();

    return plainToInstance(NewsfeedResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string): Promise<NewsfeedResponseDto> {
    const result = await this.newsfeedModel.findById(id).exec();

    if (!result) {
      throw new NotFoundException(ResponseError.NEWSFEED_NOT_FOUND);
    }

    console.log("Find Newsfeed: ", result);
    return plainToInstance(NewsfeedResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

}
