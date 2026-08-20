import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    duration: { type: Number, required: true, min: 1 },
    target: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Workout = mongoose.model('Workout', workoutSchema);