import mongoose, { Schema, Document } from 'mongoose';

export interface WorkoutDocument extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  category: string;
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  scheduledFor: Date;
}

const workoutSchema = new Schema<WorkoutDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  scheduledFor: { type: Date, required: true },
});

const Workout = mongoose.model<WorkoutDocument>('Workout', workoutSchema);
export default Workout;
