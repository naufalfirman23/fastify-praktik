import authController from "../controllers/authController.js";
import { authenticate, authorize } from "../middleware/auth";

async function authRoutes(fastify, options) {
  // Route untuk login
  fastify.post('/login', async (request, reply) => {
    try {
      const response = await authController.login(request, reply);
      return response;
    } catch (error) {
      reply.code(500).send({ status: 'error', message: error.message || 'Internal Server Error' });
    }
  });


  // Route untuk register
  fastify.post('/register', async (request, reply) => {
    try {
      const response = await authController.register(request, reply);
      return response;
    } catch (error) {
      reply.code(500).send({ status: 'error', message: error.message || 'Internal Server Error' });
    }
  });
}



export default authRoutes;