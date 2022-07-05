import { Schema } from 'mongoose';

const meal = new Schema({
  foodName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const MealSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    meals: {
      type: [meal],
    },
  },
  {
    collection: 'meals',
    timestamps: true,
  }
);

export { MealSchema };
