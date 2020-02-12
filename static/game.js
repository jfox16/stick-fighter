var socket = io();
socket.on("message", function(data) {
  console.log(data);
})

var keyMap = {
  87: 'up',
  83: 'down',
  65: 'left',
  68: 'right'
}

var inputs = {
  up: false,
  down: false,
  left: false,
  right: false,
}

document.addEventListener("keydown", function(e) {
  inputs[keyMap[e.keyCode]] = true;
  socket.emit("inputs", inputs);
});

document.addEventListener("keyup", function(e) {
  inputs[keyMap[e.keyCode]] = false;
  socket.emit("inputs", inputs);
})

socket.emit('new player');

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext("2d");
socket.on("players", function(players) {
  context.clearRect(0, 0, 800, 600);
  context.fillStyle='green';
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(
      player.position.x, 
      player.position.y,
      10, 0, 2 * Math.PI
    );
    context.fill();
  }
})
