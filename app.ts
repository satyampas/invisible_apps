import mongoose from 'mongoose';
const AppSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: String,
  uniqueLink: { type: String, unique: true, required: true },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  settings: {
    lockType: { type: String, enum: ['none', 'pin', 'fingerprint'], default: 'none' },
    pinCode: String,
    isEncrypted: { type: Boolean, default: true }
  },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('App', AppSchema);