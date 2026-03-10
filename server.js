const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname));

io.on("connection", socket=>{

socket.on("user-call", ()=>{
socket.broadcast.emit("incoming-call");
});

});

const PORT = process.env.PORT || 3000;

http.listen(PORT);
