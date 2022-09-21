const express = require('express')
const path = require('path')

const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')
const commentRoutes = require('./routes/comments')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/posts', postRoutes)
server.use('/api/v1/users', userRoutes)
server.use('/api/v1/comments', commentRoutes)

server.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})

module.exports = server
