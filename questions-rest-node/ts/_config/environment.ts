export const environment = {
  name: process.env.NAME || 'API BASE',
  pathBase: process.env.PATHBASE || '',
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB_NAME || 'api-dev-base',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || 'test',
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