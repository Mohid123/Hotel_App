/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import { IsString } from "class-validator";

export class MenuDto {
    @IsString()
    _id: string

    @IsString()
    itemName: string

    @IsString() 
    price: string;

    @IsString()
    description: string;

    @IsString()
    category: string;

    @IsString()
    servingSize: string;
}