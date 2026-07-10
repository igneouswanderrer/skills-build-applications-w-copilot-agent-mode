import mongoose, { Schema, Document } from 'mongoose';

export interface ActivityDocument extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<ActivityDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true, default: () => new Date() },
});

const Activity = mongoose.model<ActivityDocument>('Activity', activitySchema);
export default Activity;
