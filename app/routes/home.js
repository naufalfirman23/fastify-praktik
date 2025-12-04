async function home(fastify, options) {
  // Route untuk mendapatkan semua users
  fastify.get('/', async (request, reply) => {
    try {
      const response = "SELAMAT DATANG DI API FASTIFY V1.0";
      return response;
    } catch (error) {
      reply.code(500).send({ status: 'error', message: error.message || 'Internal Server Error' });
    }
  });
  

}

export default home;