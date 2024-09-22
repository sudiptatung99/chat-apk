const { Server } = require("socket.io");
const http = require("http");

// Create HTTP server
const app = http.createServer();

const io = new Server(app, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUser.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUser.push({ userId, socketId });
    console.log(`User ${userId} connected.`);
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
  console.log(`User with socket ID ${socketId} disconnected.`);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

// Handle new connections
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
      console.log(`Message sent to ${receiverId}`);
    } else {
      console.log(`User with ID ${receiverId} not found.`);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

// Start the server on port 8000
try {
  app.listen(8000, () => {
    console.log("Server running on port 8000");
  });
} catch (error) {
  console.error("Error starting the server:", error.message);
}
