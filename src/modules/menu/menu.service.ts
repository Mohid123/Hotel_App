/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Menu } from '../../Interface/menu.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MenuDto } from './menu.dto';
import { encodeImageToBlurhash } from 'src/utils/utils';

@Injectable()
export class MenuService {
    constructor(
        @InjectModel('Menu') private readonly menuModel: Model<Menu>
      ) {}

    async addMenu(menu: MenuDto): Promise<Menu> {
        if(!menu._id) {
            menu._id = new Types.ObjectId().toString();
        }
        else {
            const menuID = await this.menuModel.findById(menu._id);
            if (!menuID) {
                menuID._id = menuID.id;
            } else {
                menuID._id = new Types.ObjectId().toString();
            }
        }
        const newMenu = new this.menuModel(menu);
        if (newMenu.images && newMenu.images.length) {
            for await (const mediaObj of newMenu.images) {
                await new Promise(async (resolve, reject) => {
                    try {
                        let mediaUrl = ''
                        mediaUrl = mediaObj.captureFileURL;
                        mediaObj['blurHash'] = await encodeImageToBlurhash(mediaUrl);
                        resolve({})
                    }
                    catch (err) {
                        reject(err)
                    }
                })
            }
        }
        return await newMenu.save().then((result) => {
            if(result) {
                return result
            }
            else {
                throw new HttpException('Failed to Create menu', HttpStatus.BAD_REQUEST)
            }
        }).catch((err) => {
            console.log(err);
            throw new HttpException('Failed to Create menu', HttpStatus.BAD_REQUEST)
        });
    }

    async getMenu(limit, offset) {
        try {
            limit = parseInt(limit) < 1 ? 10 : limit;
            offset = parseInt(offset) < 0 ? 0 : offset;
            const totalCount = await this.menuModel.countDocuments({});
            const getItems = await this.menuModel.find()
            .sort({ creationDate: -1 })
            .skip(parseInt(offset))
            .limit(parseInt(limit))
            .exec()
            return {
                data: getItems,
                totalCount: totalCount
            }
        }
        catch {
            throw new HttpException('Items Not Found', HttpStatus.NOT_FOUND)
        }
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
            ).then((result) => {
                if(result) {
                    return result
                }
                else {
                    throw new HttpException('Failed to Update Item', HttpStatus.FORBIDDEN)
                }
            });
            return updatedMenu
        }
        else {
            throw new HttpException('Menu Item with this ID does not Exist', HttpStatus.NOT_FOUND)
        }
    }

    async deleteItem(id: string): Promise<Menu> {
        if(id) {
            return await this.menuModel.findByIdAndRemove({_id: id}).then((result) => {
                if (result) {
                    return result
                }
                else {
                    throw new HttpException('Menu Item with this ID does not Exist', HttpStatus.NOT_FOUND)
                }
            }).catch(() => {
                throw new HttpException('Menu Item with this ID does not Exist', HttpStatus.NOT_FOUND)
            })
        }
    }
}
