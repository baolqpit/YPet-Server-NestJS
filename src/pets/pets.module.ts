import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from './schemas/pet.schema';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';

@Module({
  /* Hàm forFeature dùng để đăng ký schema(collection) với NestJS trong modules
  cụ thể, giúp InjectModel(...) schema vào trong các service/controller */
  imports: [MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }])],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
