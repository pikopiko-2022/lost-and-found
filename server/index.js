const server = require('./server')

const PORT = process.env.PORT || 2000

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  const envConfig = require('dotenv').config()
  if (envConfig.error) throw envConfig.error
}

server.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})
