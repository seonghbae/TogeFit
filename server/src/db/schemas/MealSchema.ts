import { Schema } from 'mongoose';

const MealSchema = new Schema({
  foodName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const MealArticleSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    meals: {
      type: [MealSchema],
      required: true,
    },
  },
  {
    collection: 'meals',
    timestamps: true,
  }
);

export { MealArticleSchema };
