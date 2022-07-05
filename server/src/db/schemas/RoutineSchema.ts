import { Schema } from 'mongoose';

const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
  },
  set: {
    type: Number,
  },
  weight: {
    type: Number,
  },
});

const RoutineSchema = new Schema(
  {
    routine_name: {
      type: String,
      required: true,
    },
    routine_list: {
      type: [ExerciseSchema],
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'routines',
    timestamps: true,
  }
);
export { RoutineSchema };
