const express = require('express')
const path = require('path')


const userRoutes = require('./routes/users')

const postRoutes = require('./routes/posts')
const commentRoutes = require('./routes/comments')
const locationRoutes = require('./routes/location')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/users', userRoutes)

server.use('/api/v1/posts', postRoutes)
server.use('/api/v1/comments', commentRoutes)
server.use('/api/v1/location', locationRoutes)

server.use('/v1/*', (req, res) => res.sendStatus(404))

server.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})

module.exports = server
