import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PetsService } from './pets.service';
import { Pet } from './schemas/pet.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePetDto } from './dto/requests/create-pet.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../common/helpers/api-response';
import { ResponseMessage } from '../common/enums/response-message.enum';
import { ResponseCode } from '../common/enums/response-code.enum';

@ApiTags('Pets')
@ApiBearerAuth('access-token')
@Controller('pets')
export class PetsController {
  constructor(private readonly petService: PetsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreatePetDto) {
    const result = await this.petService.create(body);
    return new ApiResponse(true, ResponseMessage.PET_CREATED, result, ResponseCode.CREATED);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async get() {
    const result = await this.petService.findAll();
    return new ApiResponse(true, ResponseMessage.GET_PETS_SUCCESS, result, ResponseCode.SUCCESS);
  }
}

/*Kiểu Partial<> là một utility type của TypeScript, biến mọi thuộc tính
trong Model thành Optional. Nghĩa là không cần truyền toàn bộ các trường
mà Model đó có - có thể truyền 1 phần giúp linh động trong update dữ liệu*/
