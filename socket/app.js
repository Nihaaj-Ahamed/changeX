import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const existing = onlineUser.find((user) => user.userId === userId);
  if (existing) {
    existing.socketId = socketId;
    return;
  }
  onlineUser.push({ userId, socketId });
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    if (!userId) return;
    socket.data.userId = userId;
    socket.join(userId);
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    if (!receiverId || !data) return;
    io.to(receiverId).emit("getMessage", data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(4000);
console.log("Socket server running on port 4000");
