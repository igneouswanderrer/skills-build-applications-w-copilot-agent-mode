import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  role: 'member' | 'coach' | 'admin';
  joinDate: Date;
  teamId?: mongoose.Types.ObjectId;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['member', 'coach', 'admin'], default: 'member' },
  joinDate: { type: Date, required: true, default: () => new Date() },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
});

const User = mongoose.model<UserDocument>('User', userSchema);
export default User;
