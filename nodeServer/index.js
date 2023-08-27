
//node server which will handle socket io connections
const io = require('socket.io')(8000, {
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });
const users = {};
// io.on will listen multiple instance,wherever anything is happening with a particular connection we use socket.io
io.on('connection', socket => {
    // if any new user joins ,let all the other users know
    socket.on('new-user-joined', name => {
        console.log("New user ",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);  
    });

   //broadcast the msg to other people
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message , name: users[socket.id]}) 
    });

    //send ans new-user-joined is user defined event

    //if someone left the chat ,notify this to all the other user(here disconnect is built in event)
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]) 
        delete users[socket.id];
    });
})  

