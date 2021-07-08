const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 7000;

app.get('/', (req, res) => {
  res.send("socket running")
});

io.on("connection", (socket) => {
  socket.on('send_message', (msg)=> {
    console.log(msg)
    socket.broadcast.emit('receive_message', msg);
  });

  socket.on('notification', msg => {
    io.emit('message', msg);
  });


  socket.on('testing', msg => {  //ใช้ทดสอบ (one to many)
    console.log(msg)
    io.emit('testing', msg);
  });

  socket.on('msg', msg => {  //ใช้ทดสอบ (one to many)
    console.log(msg)
    // io.emit('testing', msg);
  });


});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});


// const app = require('express')()
// const http = require('http').createServer(app)


// app.get('/', (req, res) => {
//     res.send("Node Server is running. Yay!!")
// })

// //Socket Logic
// const socketio = require('socket.io')(http)

// socketio.on("connection", (userSocket) => {
//     userSocket.on("send_message", (data) => {
//         console.log(data)
//         userSocket.emit("receive_message", data)
//     })
// })
// var port = process.env.PORT || 3000
// app.get("/video",(req,res)=>{
//     res.sendFile( __dirname+'/test.mp4')
// })
// // setInterval(()=>{
// //     console.log("ffffff")
// // },1000)

// // setInterval(()=>{
// //     console.log("deedee")
// // },500)
// // app.listen(3001)
// http.listen(port , ()=>{console.log(port)})
