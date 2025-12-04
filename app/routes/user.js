import { getAllUsers, getUserById, createUser, getAbout } from "../controllers/userController.js";

async function user(fastify, options) {
  // Route untuk mendapatkan semua users
  fastify.get('/', async (request, reply) => {
    try {
      const response = await getAllUsers(request, reply);
      return response;
    } catch (error) {
      reply.code(500).send({ status: 'error', message: error.message || 'Internal Server Error' });
    }
  });
    // Route untuk mendapatkan user berdasarkan ID
  fastify.get('/:id', async (request, reply) => {
    try {
      const response = await getUserById(request, reply);
      return response;
    } catch (error) {
      reply.code(500).send({ status: 'error', message: error.message || 'Internal Server Error' });
    }
  });
  
  // Route untuk membuat user baru
  fastify.post('/', async (request, reply) => {
    try {
      const response = await createUser(request, reply);
      return response;
    } catch (error) {
      reply.code(500).send({ status: 'error', message: error.message || 'Internal Server Error' });
    }
  });
  
  // Route about page
  fastify.get('/about', async (request, reply) => {
    try {
      const response = await getAbout(request, reply);
      return response;
    } catch (error) {
      reply.code(500).send({ status: 'error', message: error.message || 'Internal Server Error' });
    }
  });
}

export default user;