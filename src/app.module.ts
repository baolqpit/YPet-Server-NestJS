import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PetsModule } from './pets/pets.module';
import { NewsfeedsModule } from './newsfeed/newsfeeds.module';
import { VideosModule } from './videos/videos.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://baolqpit:Kitale25@cluster0.lfcja.mongodb.net/ypet_db?retryWrites=true&w=majority&appName=Cluster0',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PetsModule,
    NewsfeedsModule,
    VideosModule,
  ],
})
export class AppModule {}
