import { Schema } from 'mongoose';

const FoodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    carbohydrate: {
      type: Number,
    },
    protein: {
      type: Number,
    },
    fat: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    calories: {
      type: Number,
    },
  },
  {
    collection: 'foods',
    timestamps: true,
  }
);

export { FoodSchema };
