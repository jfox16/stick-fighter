var express = require("express");
var http = require("http");
var socketIO = require("socket.io");
var path = require("path");
const PORT = process.env.PORT || 5000;

var app = express();
var server = http.Server(app);
var io = socketIO(server, {pingInterval: 1000});

app.set('port', PORT);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/play', (req, res) => {
  res.sendFile(path.join(__dirname, 'play.html'));
});

// Start the server
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));


const Game = require('./classes/game');
let game = new Game(io); // initialize game

// GAME CLOCK
setInterval(function() {
  if (game) {
    game.update();
  }
}, 1000/60);