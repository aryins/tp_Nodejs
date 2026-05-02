import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';
import { protect } from '../middlewares/auth.js';


const messageRouter = express.Router();

messageRouter.use(protect);
messageRouter.post('/', sendMessage);
messageRouter.get('/:chatId', getMessages);

export default messageRouter;