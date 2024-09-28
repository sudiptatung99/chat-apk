import express from 'express'
const port = 8000;
import { Server } from 'socket.io';
import { createServer } from 'http'
// import { cors } from 'cors'

const app = express();
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// app.use(cors())

let onlineUser = [];

const addUser = (code, socketId) => {
  const userExists = onlineUser.find((user) => user.socketId === socketId && user.code === code);
  if (!userExists) {
    onlineUser.push({ socketId, code });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};


const getUser = (socketId) => {
  const user = onlineUser.find((user) => user.socketId === socketId);
  return user;
};

io.on('connection', (socket) => {

  // socket.emit("welcome", "welcome to server")

  socket.on("newUser", ({ code }) => {
    addUser(code, socket.id)
  })

  socket.on("message", ({ data, socketid, code }) => {
    const receiveuser = getUser(socketid)
    if (receiveuser) {
      io.emit("recive", { data, socketid, code })
    }
  })

  socket.on("disconnect", () => {
    removeUser(socket.id);

  })

})

server.listen(port, () => {
  console.log(`server start ${port}`);

})