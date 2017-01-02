var Express = require('express')
var app = new Express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var cors = require('cors')

var Log = require('log')
var log = new Log('debug')
var port = process.env.PORT || 3000

app.use(cors())

app.use(Express.static('dist'))

app.get('/', function (req, res) {
  res.send(`<h1> Hello Vue.js 2 socket. io </h1> <br> <li> yarn add socket </li> <li> function socket.io  </li>`)
//   res.redirect('index.html')
})

// io.on('connection', function (socket) {
//   socket.on('stream', function (image) {
//     socket.broadcast.emit('stream', image)
//   })
// })
// บ่งบอกสถานะคนที่เข้ามาใช้งาน โดยจะมีหมายเลข socket.id เเตกต่างกันครับ
io.on('connection', function (socket) {
  console.log('a user connected ', socket.id)
  // user ที่เปิดหรืออก browser
  socket.on('disconnect', function () {
    console.log('user disconnected ', socket.id)
  })
  // รับเฉพาะ Event ข้อความ จาก client
  socket.on('chat message', function (msg) {
    console.log('socket by : ', socket.id, ' message: ' + msg)
    // ส่งข้อมูลกลับไปหาผู้ส่งมา
    io.emit('chat message', msg)
  })
})

http.listen(port, function () {
  log.info('Run Port // localhost:', port)
})
