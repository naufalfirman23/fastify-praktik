import dotenv from 'dotenv'

dotenv.config({ path: '/custom/path/to/.env' })

const aliasMap = {
    development: "development",
    dev: "development",
    test: "test",
    production: "production",
    prod: "production"
}

const config = {
    appMode: aliasMap[process.env.NODE_ENV] || 'development',
    appHost: process.env.APP_HOST || 'localhost',
    appPort: process.env.APP_PORT || 3000
}

export default config