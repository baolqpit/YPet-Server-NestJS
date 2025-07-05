import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Newsfeed, NewsfeedSchema } from './schemas/newsfeed.schema';
import { NewsfeedsController } from './newsfeeds.controller';
import { NewsfeedService } from './newsfeeds.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Newsfeed.name, schema: NewsfeedSchema },
    ]),
  ],
  controllers: [NewsfeedsController],
  providers: [NewsfeedService],
})
export class NewsfeedsModule {}
