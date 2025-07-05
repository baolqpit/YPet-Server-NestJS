import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Newsfeed, NewsfeedDocument } from './schemas/newsfeed.schema';

@Injectable()
export class NewsfeedService {
  constructor(
    @InjectModel(Newsfeed.name) private newsfeedModel: Model<NewsfeedDocument>,
  ) {}

  create(data: Partial<Newsfeed>) {
    const created = new this.newsfeedModel(data);
    return created.save();
  }
}
