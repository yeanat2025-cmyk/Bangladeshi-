const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname));

let seats = {};

io.on("connection", socket => {

  socket.emit("seat-data", seats);

  socket.on("join-seat", num => {

    if (!seats[num]) {
      seats[num] = true;
      io.emit("seat-taken", num);
    }

  });

});

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log("Server running");
});
