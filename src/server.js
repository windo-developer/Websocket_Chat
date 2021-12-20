import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({
  server,
});

function onSocketClose() {
  console.log("Disconnected from Browser");
}

function onSocketMessage(message) {
  console.log(message.toString());
}

webSocketServer.on("connection", (socket) => {
  console.log("Connented to Browser");
  socket.on("close", onSocketClose);
  socket.on("message", onSocketMessage);
  socket.send("send socket message");
});

server.listen(3000, handleListen);
