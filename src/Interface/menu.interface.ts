/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
export interface Menu extends Document {
    id?: string;
    itemName: string;
    price: string;
    description: string;
    category: string;
    servingSize: string;
    images: any[]; 
}