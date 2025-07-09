import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pet, PetDocument } from './schemas/pet.schema';
import { Model } from 'mongoose';
import { CreatePetDto } from './dto/requests/create-pet.dto';
import { plainToInstance } from 'class-transformer';
import { PetResponseDto } from './dto/responses/pet-response.dto';

@Injectable()
export class PetsService {
  constructor(@InjectModel(Pet.name) private petModel: Model<PetDocument>) {}

  async create(data: CreatePetDto) {
    const pet = new this.petModel(data);

    return plainToInstance(PetResponseDto, (await pet.save()).toObject(), {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<PetResponseDto[]> {
    const result = await this.petModel.find().exec();

    return plainToInstance(PetResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
