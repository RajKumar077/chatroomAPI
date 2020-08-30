const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  handlePreflightRequest: (req, res) => {
    console.log("handlePreflightRequest called");
    const headers = {
      "Access-Control-Allow-Headerst": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true,
    };
    res.writeHead(200, headers);
    res.end();
  },
});

io.on("connection", (socket) => {
  socket.on("message", ({ username, message }) => {
    io.emit("message", { username, message });
  });
});

http.listen(8080, function () {
  console.log("listening on 8080..");
});
