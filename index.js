const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { origins: "*:*" });

io.on("connection", (socket) => {
  socket.on("message", ({ username, message }) => {
    io.emit("message", { username, message });
  });
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://chatroom-frontend-eosin.vercel.app');
  next();
});

app.get('/', (req, res) => {
  res.send('Chat API running..')
});

const port = process.env.PORT || 8080;

http.listen(port, function () {
  console.log("listening on 8080...");
});
