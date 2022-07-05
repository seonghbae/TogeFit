import { Schema } from 'mongoose';

const ExcerciseListSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'excerciselists',
    timestamps: true,
  }
);

export { ExcerciseListSchema };
