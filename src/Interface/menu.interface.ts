/* eslint-disable prettier/prettier */
export interface Menu extends Document {
    id?: string;
    itemName: string;
    price: string;
    description: string;
    category: string;
    servingSize: string;    
}