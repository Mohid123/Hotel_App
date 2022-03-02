/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { MenuModule } from './modules/menu/menu.module';
import { MediaUploadModule } from './modules/file-management/media-upload/media-upload.module';

@Module({
  imports: [MenuModule, MongooseModule.forRoot(config.mongoURI), MediaUploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
