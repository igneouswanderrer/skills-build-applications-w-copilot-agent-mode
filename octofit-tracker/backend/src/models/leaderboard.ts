import mongoose, { Schema, Document } from 'mongoose';

export interface LeaderboardDocument extends Document {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  score: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<LeaderboardDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, required: true, default: () => new Date() },
});

const Leaderboard = mongoose.model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
export default Leaderboard;
