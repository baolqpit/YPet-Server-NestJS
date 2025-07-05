import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { RequestUserDto } from './dto/requests/request-user.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto/responses/response-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: RequestUserDto): Promise<ResponseUserDto> {
    const created = new this.userModel(data);
    const saved = await created.save();

    ///Chuyển đổi từ Document sang DTO tự động (các fields có @Expose)
    return plainToInstance(ResponseUserDto, saved.toObject(), {
      ///Bỏ qua các fields không có @Expose
      excludeExtraneousValues: true,
    });
  }
}
