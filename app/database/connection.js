import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fastify_app',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let connection;

export const connectDB = async () => {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Berhasil terkoneksi ke database MySQL');
    return connection;
  } catch (error) {
    console.error('Kesalahan saat konek ke database:', error.message);
    throw error;
  }
};

export const getConnection = () => {
  if (!connection) {
    throw new Error('Database belum terkoneksi. Harap hubungkan dulu.');
  }
  return connection;
};

export default connectDB;