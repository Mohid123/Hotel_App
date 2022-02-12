/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        return await this.menuModel.find().then((result) => {
            if(result) {
                return result
            }
            else {
                throw new HttpException('Menu Items not Found', HttpStatus.NOT_FOUND)
            }
        }).catch(() => {
            throw new HttpException('Menu Items not Found', HttpStatus.NOT_FOUND)
        })
    }

    async getMenuItem(id: string): Promise<Menu> {
        return await this.menuModel.findById({_id: id}).then((result) => {
            if(result) {
                return result
            } else {
                throw new HttpException('Menu Item with this ID does not Exist', HttpStatus.NOT_FOUND)
            }
        }).catch(() => {
            throw new HttpException('Menu Item with this ID does not Exist', HttpStatus.NOT_FOUND)
        })
    }

    async updateMenu(menu: MenuDto, id: string): Promise<Menu> {
        const menuItem = this.menuModel.findOne({_id: id});
        if(menuItem) {
            const updatedMenu = await this.menuModel.findByIdAndUpdate(
                {_id: id},
                menu
            );
            return updatedMenu
        }
    }

    async deleteItem(id: string): Promise<Menu> {
        return await this.menuModel.findByIdAndRemove({_id: id})
    }
}
