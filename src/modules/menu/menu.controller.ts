/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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

    @Get()
    getEntireMenu(): Promise<Menu[]> {
        return this.menuService.getMenu();
    }

    @Get(':id')
    getOneMenuItem(@Param('id') id): Promise<Menu> {
        return this.menuService.getMenuItem(id)
    }

    @Put(':id')
    updateMenuItem(@Body() menuDto: MenuDto, @Param('id') id): Promise<Menu> {
        return this.menuService.updateMenu(menuDto, id);
    }

    @Delete(':id')
    deleteMenuItem(@Param('id') id): Promise<Menu> {
        return this.menuService.deleteItem(id)
    }
}
