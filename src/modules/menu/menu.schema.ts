/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const MenuSchema = new mongoose.Schema(
    {
        _id: { type: String, default: '' },
        itemName: { type: String, default: '' },
        price: { type: String, default: '' },
        description: { type: String, default: '' },
        category: { type: String, default: '' },
        servingSize: { type: String, default: '' },
        images: { type: Array, default: [] },
    },
    {
        collection: 'Menu',
    }
);

MenuSchema.set('timestamps', true);
MenuSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    delete ret._id;
  },
});