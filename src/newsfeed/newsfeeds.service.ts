import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
import {
  NewsfeedLike,
  NewsfeedLikeDocument,
} from './schemas/newsfeed-like.schema';
import { ResponseMessage } from '../common/enums/response-message.enum';

@Injectable()
export class NewsfeedService {
  constructor(
    @InjectModel(Newsfeed.name) private newsfeedModel: Model<NewsfeedDocument>,
    @InjectModel(NewsfeedLike.name)
    private newsfeedLikeModel: Model<NewsfeedLikeDocument>,
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
    const result = await this.newsfeedModel
      .find()
      .sort({ createdDate: -1 })
      .exec();

    return plainToInstance(NewsfeedResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string): Promise<NewsfeedResponseDto> {
    const result = await this.newsfeedModel.findById(id).exec();

    if (!result) {
      throw new NotFoundException(ResponseError.NEWSFEED_NOT_FOUND);
    }

    console.log('Find Newsfeed: ', result);
    return plainToInstance(NewsfeedResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    userPayload: any,
    data: UpdateNewsfeedDto,
  ): Promise<UpdateNewsfeedResponseDto> {
    const post = await this.newsfeedModel.findById(data.id).exec();

    if (!post) {
      throw new NotFoundException(ResponseError.NEWSFEED_NOT_FOUND);
    }

    console.log('Find Newsfeed: ', post);

    post.title = data.title;
    post.content = data.content;
    post.description = data.description;
    post.commentCount = data.commentCount;
    post.favouriteCount = data.favouriteCount;
    post.urlToImages = data.urlToImages;

    const updated = await post.save();

    if (!updated) {
      throw new HttpException(
        ResponseError.NEWSFEED_NOT_FOUND,
        ResponseCode.SERVER_ERROR,
      );
    }

    const plainResponse = {
      ...updated.toObject(),
      id: updated._id.toString(),
      updatedById: userPayload.sub,
      updatedAt: Date.now(),
    };

    console.log('Response: ', plainResponse);

    return plainToInstance(UpdateNewsfeedResponseDto, plainResponse, {
      excludeExtraneousValues: true,
    });
  }

  async likeNewsfeed(newsfeedId: string, userPayload: any) {
    const exists = await this.newsfeedLikeModel.findOne({
      newsfeedId: newsfeedId,
      userId: userPayload.sub,
    });

    if (exists) {
      return { success: true, message: ResponseMessage.ALREADY_LIKED };
    }

    const updatedPost = await this.newsfeedModel.findByIdAndUpdate(
      newsfeedId,
      {
        $inc: { favouriteCount: 1 },
      },
      { new: true },
    );

    const plainResponse = {
      ...updatedPost!.toObject(),
      id: updatedPost!._id.toString(),
    };

    console.log('Like response: ', plainResponse);

    return plainToInstance(NewsfeedResponseDto, plainResponse, {
      excludeExtraneousValues: true,
    });
  }

  async unlikeNewsfeed(newsfeedId: string, userPayload: any) {
    await this.newsfeedLikeModel.deleteOne({
      newsFeedId: new Types.ObjectId(newsfeedId),
      userId: new Types.ObjectId(userPayload.sub),
    });

    const updatedPost = await this.newsfeedModel.findByIdAndUpdate(
      newsfeedId,
      {
        $inc: { favouriteCount: -1 },
      },
      { new: true },
    );

    const plainResponse = {
      ...updatedPost!.toObject(),
      id: updatedPost!._id.toString(),
    };

    console.log('Unlike response: ', plainResponse);

    return plainToInstance(NewsfeedResponseDto, plainResponse, {
      excludeExtraneousValues: true,
    });
  }

  async isLiked(newsfeedId: string, userPayload: any) {
    const exists = await this.newsfeedLikeModel.exists(
      {
        newsfeedId: new Types.ObjectId(newsfeedId),
        userId: new Types.ObjectId(userPayload.sub),
      }
    );

    return {liked: !!exists};
  }
}
