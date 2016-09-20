'use strict'
var socketio = require('socket.io')
const db = require('../db')
const User = db.model('user')
var io = null
const userStorage = []
let userTotal = 0

function findSID (aUser) {
  for (var i = 0; i < userStorage.length; i++) {
    if (userStorage[i].userName === aUser) {
      console.log('socketId found for ' + aUser)
      return userStorage[i].userId
    }
  }
  console.log('socketId not found.')
  return 0
}

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
          console.log('Recieved Msg - ' + userStorage[i].userName + ': ' + msgContent.message + ' ' + msgContent.timestamp)
          break
        } else {
          if (i === userStorage.length - 1) {
            console.log('Recieved a client message from non-user.')
          }
        }
      }
    })

    socket.on('adminmessage', function (data) {
      User.findOne({
        where: {
          id: data.id
        }
      })
        .then(function (myUser) {
          return myUser.checkAdmin()
        })
        .then(function (result) {
          if (result) {
            console.log('Approved to send chat message.')
            let sendingTo = findSID(data.user)
            io.sockets.socket(sendingTo).emit('servermessage', data.message)
          } else {
            console.log('Not an admin! Cannot send chat messages.')
          }
        })
        .catch(function (error) {
          console.error(error)
        })
    })
  })

  return io
}
