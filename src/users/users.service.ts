import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/requests/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from './dto/responses/response-user.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseError } from '../common/enums/response-error.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(data: CreateUserDto): Promise<ResponseUserDto> {
    ///Mã hóa mật khẩu trước khi tạo user
    data.password = await bcrypt.hash(data.password, 10);
    const user = new this.userModel(data);

    const savedUser = await user.save();

    const plainUser = {
      id: savedUser._id.toString(),
      ...savedUser.toObject(),
    };

    ///Chuyển đổi từ Document sang DTO tự động (các fields có @Expose)
    return plainToInstance(ResponseUserDto, plainUser, {
      ///Bỏ qua các fields không có @Expose
      excludeExtraneousValues: true,
    });
  }

  async findByPayload(payload: any): Promise<ResponseUserDto> {
    console.log('Looking for user with id:', payload.sub);

    const user = await this.userModel.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException(ResponseError.USER_NOT_FOUND);
    }

    return plainToInstance(ResponseUserDto, user.toObject(), {
      excludeExtraneousValues: true,
    });
  }


  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
