import express from 'express';
import { createUser, getUsers, deleteUser, loginUser } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/', protect, getUsers);
userRouter.delete('/:id', protect, deleteUser);


export default userRouter;