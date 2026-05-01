const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

module.exports = app;