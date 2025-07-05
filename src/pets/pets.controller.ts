import { Body, Controller, Post } from '@nestjs/common';
import { PetsService } from './pets.service';
import { Pet } from './schemas/pet.schema';

@Controller('pets')
export class PetsController {
  constructor(private readonly petService: PetsService) {}

  @Post()
  create(@Body() body: Partial<Pet>) {
    return this.petService.create(body);
  }
}

/*Kiểu Partial<> là một utility type của TypeScript, biến mọi thuộc tính
trong Model thành Optional. Nghĩa là không cần truyền toàn bộ các trường
mà Model đó có - có thể truyền 1 phần giúp linh động trong update dữ liệu*/
