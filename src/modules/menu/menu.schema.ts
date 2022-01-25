/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { Category } from 'src/Interface/category.interface';

export const MenuSchema = new mongoose.Schema({
    itemName: String,
    price: Number,
    description: String,
    category: Category
})