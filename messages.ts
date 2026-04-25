import express from 'express';
import Message from '../models/Message';
import { authMiddleware } from '../middleware/auth';
import { decrypt } from '../utils/encryption';

const router = express.Router();

router.get('/:appId', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({ appId: req.params.appId })
      .sort({ createdAt: 1 })
      .lean();
    const decryptedMessages = messages.map(msg => ({
      ...msg,
      content: decrypt(msg.content)
    }));
    res.json(decryptedMessages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

export default router;