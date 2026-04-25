import mongoose from 'mongoose';
const MessageSchema = new mongoose.Schema({
  appId: { type: mongoose.Schema.Types.ObjectId, ref: 'App', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['text', 'image', 'file'], default: 'text' },
  mediaUrl: String,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Message', MessageSchema);