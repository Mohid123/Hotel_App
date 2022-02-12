/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Menu } from 'src/Interface/menu.interface';
import { MenuDto } from './menu.dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
    constructor(private menuService: MenuService) {}
    @Post()
    async createMenu(@Body() menuDto: MenuDto): Promise<Menu> {
        return this.menuService.addMenu(menuDto)
    }

    @Get()
    async getEntireMenu(): Promise<Menu[]> {
        return this.menuService.getMenu();
    }

    @Get(':id')
    async getOneMenuItem(@Param('id') id): Promise<Menu> {
        return this.menuService.getMenuItem(id)
    }
}
