import { Schema } from 'mongoose';

const FoodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    carbohydrate: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
  },
  {
    collection: 'foods',
    timestamps: true,
  }
);

export { FoodSchema };
