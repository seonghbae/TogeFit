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

const RoutineListSchema = new Schema({
  routine_name: {
    type: String,
  },
  routine_list: [ExerciseSchema],
});

const RoutineSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    routines: {
      type: [RoutineListSchema],
      default: [],
    },
  },
  {
    collection: 'routines',
    timestamps: true,
  }
);
export { RoutineSchema };
