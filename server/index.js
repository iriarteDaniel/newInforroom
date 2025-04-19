import { createServer } from 'http'
import { Server } from 'socket.io'
import express from 'express'
import logger from 'morgan'

const app = express()
const server = createServer(app)

const io = new Server(server, {
  connectionStateRecovery: {}
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('chat message', (msg, name) => {
    console.log(name + ': ' + msg)
    io.emit('chat message', msg, name)
  })

  if(!socket.recovered) {
    console.log('recovered connection')
  }
})


app.use(logger('dev'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})