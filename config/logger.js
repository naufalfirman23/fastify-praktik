// logger.js
import config from './app.js';

const loggerConfigs = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname'
            }
        }
    },
    production: true,
    test: true
}

// Gunakan config development sebagai fallback
const loggerConfig = loggerConfigs[config.appMode] || loggerConfigs.development;

export default loggerConfig;