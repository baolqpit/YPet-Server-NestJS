import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PetsModule } from './pets/pets.module';
import { NewsfeedsModule } from './newsfeed/newsfeeds.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://baolqpit:Kitale25@cluster0.lfcja.mongodb.net/ypet_db?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UsersModule,
    PetsModule,
    NewsfeedsModule,
    VideosModule,
  ],
})
export class AppModule {}
