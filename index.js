const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
var cors = require("cors");

app.use(cors());

io.on("connection", (socket) => {
  socket.on("message", ({ username, message }) => {
    io.emit("message", { username, message });
  });
});

http.listen(8080, function () {
  console.log("listening on 8080..");
});