import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Newsfeed, NewsfeedSchema } from './schemas/newsfeed.schema';
import { NewsfeedsController } from './newsfeeds.controller';
import { NewsfeedService } from './newsfeeds.service';
import { NewsfeedLike, NewsfeedLikeSchema } from './schemas/newsfeed-like.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Newsfeed.name, schema: NewsfeedSchema },
      { name: NewsfeedLike.name, schema: NewsfeedLikeSchema },
    ]),
  ],
  exports: [MongooseModule],
  controllers: [NewsfeedsController],
  providers: [NewsfeedService],
})
export class NewsfeedsModule {}
