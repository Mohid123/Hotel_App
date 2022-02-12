/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuSchema } from './menu.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Menu', schema: MenuSchema },
    ]),
  ],
  controllers: [MenuController],
  providers: [MenuService]
})
export class MenuModule {}
