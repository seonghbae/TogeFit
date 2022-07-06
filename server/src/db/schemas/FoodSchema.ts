import { Schema } from 'mongoose';

const FoodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    carbohydrate: {
      type: Number,
      default: 0,
      required: true,
    },
    protein: {
      type: Number,
      default: 0,
      required: true,
    },
    fat: {
      type: Number,
      default: 0,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
      required: true,
    },
    calories: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    collection: 'foods',
    timestamps: true,
  }
);

export { FoodSchema };
