var express = require("express");
var http = require("http");
var socketIO = require("socket.io");
var path = require("path");
const PORT = process.env.PORT || 5000;

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', PORT);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Add the WebSocket handlers
io.on("connection", function(socket) {
  
});

const players = {};

// GAME LOOP
setInterval(function() {
  Object.values(players).forEach((player) => {
    let xMove = 0;
    let yMove = 0;
    let moveSpeed = 5;
    if (player.inputs.up) yMove--;
    if (player.inputs.down) yMove++;
    if (player.inputs.left) xMove--;
    if (player.inputs.right) xMove++;
    player.position.x += xMove*moveSpeed;
    player.position.y += yMove*moveSpeed;
  });

  io.sockets.emit("players", players);
}, 1000/60);

io.on("connection", function(socket) {
  socket.on("new player", function() {
    players[socket.id] = {
      inputs: {},
      position: {x:300, y:300}
    };
  });
  socket.on("inputs", function(inputs) {
    let player = players[socket.id];
    if (player) player.inputs = inputs;
  })
})