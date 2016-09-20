'use strict'
var socketio = require('socket.io')
var io = null
const userStorage = []
let userTotal = 0

module.exports = function (server) {
  if (io) return io

  io = socketio(server)

  io.on('connection', function (socket) {
    // New Connection
    let authed = false
    userTotal++
    var socketId = socket.id
    var clientIp = socket.request.connection.remoteAddress
    userStorage.push({
      userNum: userTotal,
      userId: socketId,
      userIP: clientIp,
      chatHistory: []
    })
    console.log('Connection #' + userTotal + ' using socket ' + socketId + ' incoming connection from ' + clientIp + '.')

    // Disconnect
    socket.on('disconnect', function () {
      console.log(socket.id + ' disconnected from server.')
    })

    // Events
    socket.on('authenticated', function (username) {
      if (!authed) {
        authed = true
        console.log(socket.id + ' is user: ' + username)
        for (var i = 0; i < userStorage.length; i++) {
          if (userStorage[i].userId === socket.id) {
            userStorage[i].userName = username
            socket.emit('openchat')
            let msgContent = {
              message: 'Hi ' + username + ' welcome back! Is there anything I can help you with today? Totes or not totes?',
              user: 'A Hipster'
            }
            socket.emit('servermessage', msgContent)
            userStorage[i].chatHistory.push(msgContent)
            break
          }
          if (i === userStorage.length - 1) {
            userStorage[i].userName = 'Session User'
          }
        }
      }
    })

    socket.on('clientmessage', function (msgContent) {
      for (var i = 0; i < userStorage.length; i++) {
        if (userStorage[i].userId === socket.id) {
          userStorage[i].chatHistory.push(msgContent)
        }
      }
    })
  })

  return io
}
