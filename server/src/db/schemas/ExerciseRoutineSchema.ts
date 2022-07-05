import { Schema } from 'mongoose';

const RoutineSchema = new Schema({
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

const ExerciseRoutineSchema = new Schema(
  {
    routine_name: {
      type: String,
      required: true,
    },
    routine_list: {
      type: [RoutineSchema],
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
export { ExerciseRoutineSchema };
