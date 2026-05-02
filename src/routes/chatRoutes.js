import express from 'express';
import { createChat, getChats, getChatById } from '../controllers/chatController.js';
import { protect } from '../middlewares/auth.js';

const chatRouter = express.Router();

chatRouter.use(protect); // Todas las rutas requieren autenticación
chatRouter.post('/', createChat);
chatRouter.get('/', getChats);
chatRouter.get('/:id', getChatById);

export default chatRouter ;