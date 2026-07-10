import mongoose, { Schema, Document } from 'mongoose';

export interface TeamDocument extends Document {
  name: string;
  description: string;
  createdAt: Date;
  memberCount: number;
}

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true, default: () => new Date() },
  memberCount: { type: Number, required: true, default: 0 },
});

const Team = mongoose.model<TeamDocument>('Team', teamSchema);
export default Team;
