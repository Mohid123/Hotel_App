/* eslint-disable prettier/prettier */
import { IsString, IsInt, IsObject } from "class-validator";
import { Category } from "src/Interface/category.interface";

export class MenuDto { 
    @IsString()
    itemName: string

    @IsInt() 
    price: number;

    @IsString()
    description: string;

    @IsObject()
    category: Category
}