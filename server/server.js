const express = require('express')
const path = require('path')

const postRoutes = require('./routes/posts')
const commentRoutes = require('./routes/comments')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/posts', postRoutes)
server.use('/api/v1/comments', commentRoutes)

module.exports = server
