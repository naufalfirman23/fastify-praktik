// Controller home
import { getConnection } from '../database/connection.js';

export async function getAllUsers(request, reply) {
  try {
    // Query ke database untuk mendapatkan semua users
    const connection = getConnection();
    const [rows] = await connection.execute('SELECT * FROM users');

    return { status: 'success', data: rows };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users from database');
  }
}

export async function getUserById(request, reply) {
  try {
    const { id } = request.params;

    // Query ke database untuk mendapatkan user berdasarkan ID
    const connection = getConnection();
    const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);

    if (rows.length === 0) {
      reply.status(404).send({ status: 'error', message: 'User not found' });
      return;
    }

    return { status: 'success', data: rows[0] };
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user from database');
  }
}

export async function getUserByEmail(email) {
  try {
    const connection = getConnection();
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw new Error('Failed to fetch user by email from database');
  } 
}


export async function createUser(request, reply) {
  try {
    const { name, email, password, role} = request.body;

    // Query ke database untuk membuat user baru
    const connection = getConnection();
    const [result] = await connection.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email, password, role]
    );

    const [newUser] = await connection.execute(
      'SELECT * FROM users WHERE id = ?',
      [result.insertId]
    );

    reply.status(201);
    return { status: 'success', message: 'User created successfully', data: newUser[0] };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user in database');
  }
}

export async function getAbout(request, reply) {
  return { message: 'This is the about page', timestamp: new Date().toISOString() };
}