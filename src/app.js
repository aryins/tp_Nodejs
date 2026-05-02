import express, { json, urlencoded } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import { mongoose } from 'mongoose';

const connectMongoDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.log(error.message);
  }
};

const app = express();

// Middlewares
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API funcionando correctamente' });
});


// Manejo de errores
app.use(notFound);
app.use(errorHandler);


export default app;