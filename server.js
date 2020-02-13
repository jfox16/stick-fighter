// modules
const http = require("http");
const path = require("path");
const express = require("express");
const socketIO = require("socket.io");

// classes
const Game = require('./server/classes/Game');

// constants
const PORT = process.env.PORT || 5000;
const FRAME_RATE = 1000 / 60; // 60 fps

var app = express();
var server = http.Server(app);
var io = socketIO(server, {pingInterval: 1000});
let game = new Game(io); // initialize game

app.set('port', PORT);
app.use('/client', express.static(__dirname + '/client'));

// Routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

// GAME CLOCK
setInterval(function() {
  if (game) {
    game.update();
    game.sendState();
  }
}, FRAME_RATE);

// Start the server
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));