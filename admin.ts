import express from 'express';
import User from '../models/User';
import App from '../models/App';
import Message from '../models/Message';
const router = express.Router();
router.use((req, res, next) => {
  if (req.headers['x-admin-key'] !== process.env.ADMIN_API_KEY) return res.status(403).json({ error: 'Forbidden' });
  next();
});
router.get('/stats', async (req, res) => {
  const users = await User.countDocuments();
  const apps = await App.countDocuments();
  const messages = await Message.countDocuments();
  res.json({ stats: { users, apps, messages, revenue: 124.50 }, logs: [] });
});
export default router;