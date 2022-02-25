/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Menu } from 'src/Interface/menu.interface';
import { MenuDto } from './menu.dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
    constructor(private menuService: MenuService) {}
    @Post()
    createMenu(@Body() menuDto: MenuDto): Promise<Menu> {
        return this.menuService.addMenu(menuDto)
    }

    @Get('getAllMenuItems')
    getEntireMenu(
        @Query('limit') limit = 10,
        @Query('offset') offset = 0
        ): Promise<Menu[]> {
        const menu = this.menuService.getMenu(limit, offset)
        return menu
    }

    @Get('getMenuItem/:id')
    getOneMenuItem(@Param('id') id): Promise<Menu> {
        return this.menuService.getMenuItem(id)
    }

    @Put('updateMenuItem/:id')
    updateMenuItem(@Body() menuDto: MenuDto, @Param('id') id): Promise<Menu> {
        return this.menuService.updateMenu(menuDto, id);
    }

    @Delete('deleteMenuItem/:id')
    deleteMenuItem(@Param('id') id): Promise<Menu> {
        return this.menuService.deleteItem(id)
    }
}
