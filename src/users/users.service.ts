import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/requests/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from './dto/responses/response-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: CreateUserDto): Promise<ResponseUserDto> {
    ///Mã hóa mật khẩu trước khi tạo user
    data.password = await bcrypt.hash(data.password, 10);
    const user = new this.userModel(data);

    ///Chuyển đổi từ Document sang DTO tự động (các fields có @Expose)
    return plainToInstance(ResponseUserDto, (await user.save()).toObject(), {
      ///Bỏ qua các fields không có @Expose
      excludeExtraneousValues: true,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
