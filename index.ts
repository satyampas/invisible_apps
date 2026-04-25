import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import Message from '../models/Message';
import { encrypt, decrypt } from '../utils/encryption';
export const setupSocket = (io: Server) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      socket.data.userId = (decoded as any).userId;
      next();
    } catch { next(new Error('unauthorized')); }
  });
  io.on('connection', (socket) => {
    socket.on('join-app', (appId: string) => socket.join(`app:${appId}`));
    socket.on('send-message', async (data) => {
      const { appId, content, type, mediaUrl } = data;
      const encryptedContent = encrypt(content);
      const message = await Message.create({ appId, senderId: socket.data.userId, content: encryptedContent, type, mediaUrl });
      io.to(`app:${appId}`).emit('new-message', { ...message.toObject(), content: decrypt(encryptedContent) });
    });
  });
};