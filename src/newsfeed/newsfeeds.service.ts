import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Newsfeed, NewsfeedDocument } from './schemas/newsfeed.schema';
import { CreateNewsfeedDto } from './dto/requests/create-newsfeed.dto';
import { NewsfeedResponseDto } from './dto/responses/newsfeed-response.dto';
import { plainToInstance } from 'class-transformer';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseError } from '../common/enums/response-error.enum';
import { ResponseCode } from '../common/enums/response-code.enum';
import { UpdateNewsfeedResponseDto } from './dto/responses/update-newsfeed-response.dto';
import { UpdateNewsfeedDto } from './dto/requests/update-newsfeed.dto';

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

  async update(userPayload: any, data: UpdateNewsfeedDto): Promise<UpdateNewsfeedResponseDto> {
    const post = await this.newsfeedModel.findById(data.id).exec();

    if (!post) {
      throw new NotFoundException(ResponseError.NEWSFEED_NOT_FOUND);
    }

    console.log("Find Newsfeed: ", post);

    post.title = data.title;
    post.content = data.content;
    post.description = data.description;
    post.commentCount = data.commentCount;
    post.favouriteCount = data.favouriteCount;
    post.urlToImages = data.urlToImages;

    const updated = await post.save();

    if (!updated) {
      throw new HttpException(ResponseError.NEWSFEED_NOT_FOUND, ResponseCode.SERVER_ERROR);
    }

    const plainResponse = {
      ...updated.toObject(),
      id: updated._id.toString(),
      updatedById: userPayload.sub,
      updatedAt: Date.now(),
    }

    console.log('Response: ', plainResponse);

    return plainToInstance(UpdateNewsfeedResponseDto, plainResponse, {
      excludeExtraneousValues: true,
    });
  }

}
