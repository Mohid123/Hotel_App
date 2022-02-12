/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Menu } from '../../Interface/menu.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MenuDto } from './menu.dto';

@Injectable()
export class MenuService {
    constructor(
        @InjectModel('Menu') private readonly menuModel: Model<Menu>
      ) {}

    async addMenu(menu: MenuDto): Promise<Menu> {
        if(!menu._id) {
            menu._id = new Types.ObjectId().toString();
        }
        const newMenu = new this.menuModel(menu);
        return await newMenu.save();
    }

    async getMenu(): Promise<Menu[]> {
        return await this.menuModel.find().exec();
    }

    async getMenuItem(menu: MenuDto): Promise<Menu> {
        return this.menuModel.findById({_id: menu._id})
    }
}
