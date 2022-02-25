/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import { ApiProperty } from "@nestjs/swagger";

export class MenuDto {
    @ApiProperty()
    _id: string

    @ApiProperty()
    itemName: string

    @ApiProperty()
    price: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    category: string;

    @ApiProperty()
    servingSize: string;

    @ApiProperty({
        example:
        [
            {
            captureFileURL: '',
            blurHash:'',
          }
        ]
    })
    images: any[];
}