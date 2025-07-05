import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pet, PetDocument } from './schemas/pet.schema';
import { Model } from 'mongoose';

@Injectable()
export class PetsService {
  constructor(@InjectModel(Pet.name) private petModel: Model<PetDocument>) {}

  create(data: Partial<Pet>) {
    const createdPet = new this.petModel(data);
    return createdPet.save();
  }
}
