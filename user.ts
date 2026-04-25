import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  phone: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true },
  name: String,
  appsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'App' }],
  appsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'App' }],
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('User', UserSchema);