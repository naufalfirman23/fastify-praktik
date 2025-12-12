import Fastify from 'fastify';
import logger from '../config/logger.js';
import {registerRoutes} from './routes/index.js';
import connectDB from './database/connection.js';
import jwt from '@fastify/jwt';

const app = Fastify({
  logger: logger
});

// Register JWT plugin
app.register(jwt, {
  secret: process.env.JWT_SECRET || 'default_secret_key'
});

// Koneksikan ke database saat aplikasi dimulai
app.register(async (instance, opts) => {
  try {
    await connectDB();
    instance.get('/', async (req, res) => {
      return { message: 'Aplikasi berjalan dan terkoneksi ke database' };
    });
  } catch (error) {
    instance.log.error('Gagal terkoneksi ke database:', error);
    process.exit(1);
  }
});


await registerRoutes(app);

export default app;