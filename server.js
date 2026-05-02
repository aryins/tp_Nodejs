import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/database.js';

const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
  console.log(` API Health check: http://localhost:${PORT}/api/health`);
});

// Manejar cierre graceful
process.on('SIGTERM', () => {
  console.log('SIGTERM recibido, cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});