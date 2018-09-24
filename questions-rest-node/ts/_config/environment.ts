export const environment = {
  name: process.env.NAME || 'API QUESTION',
  pathBase: process.env.PATHBASE || '',
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB_NAME || 'questions',
    user: process.env.DB_USER || 'mongo',
    password: process.env.DB_PASS || 'mongo',
    options: {
      dialect: process.env.DIALECT || 'mongodb',
      host: process.env.HOST || 'localhost',
      port: process.env.DB_PORT || 27017
    }
  },
  authentication: {
    enableHTTPS: process.env.ENABLE_HTTPS || false,
    certificate: process.env.CERT_FILE || '',
    key: process.env.CERT_KEY_FILE || ''
  },
}