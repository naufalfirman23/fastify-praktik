import app from './app/index.js';
import config from './config/app.js';

try {
  const port = config.appPort;
  const host = config.appHost;
  
  await app.listen({ host: host, port: port });
  console.log(`Server is running on http://${host}:${port}`);
} catch (err) {
  app.log.fatal(err);
  process.exit(1);
}