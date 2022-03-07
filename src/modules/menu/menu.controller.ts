/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Menu } from 'src/Interface/menu.interface';
import { MenuDto } from './menu.dto';
import { MenuService } from './menu.service';
@ApiTags('Menu')
@Controller('menu')
export class MenuController {
    constructor(private menuService: MenuService) {}
    @Post()
    createMenu(@Body() menuDto: MenuDto): Promise<Menu> {
        return this.menuService.addMenu(menuDto)
    }

    @Get('getAllMenuItems')
   async getEntireMenu(
        @Query('limit') limit = 10,
        @Query('offset') offset = 0
        ) {
        const menu = this.menuService.getMenu(limit, offset)
        return await menu
    }

    @Get('getMenuItem/:id')
    getOneMenuItem(@Param('id') id: string): Promise<Menu> {
        return this.menuService.getMenuItem(id)
    }

    @Put('updateMenuItem/:id')
    updateMenuItem(@Body() menuDto: MenuDto, @Param('id') id: string): Promise<Menu> {
        return this.menuService.updateMenu(menuDto, id);
    }

    @Delete('deleteMenuItem/:id')
    deleteMenuItem(@Param('id') id: string): Promise<Menu> {
        return this.menuService.deleteItem(id)
    }
}
