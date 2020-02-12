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

const setButton = (button, value) => {
  if (button !== undefined && inputs[button] !== value) {
    inputs[button] = value;
    socket.emit("setButton", {button: button, value: value});
  }
}

// Event listeners
document.addEventListener("keydown", function(e) {
  let button = keyMap[e.keyCode];
  setButton(button, true);
});

document.addEventListener("keyup", function(e) {
  let button = keyMap[e.keyCode];
  setButton(button, false);
});

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var ctx = canvas.getContext("2d");

socket.on("players", function(players) {
  ctx.clearRect(0, 0, 800, 600);
  ctx.fillStyle='hsla(0, 0%, 0%, 0.5)';
  for (var id in players) {
    var player = players[id];
    ctx.beginPath();
    ctx.arc(
      player.position.x, 
      player.position.y,
      10, 0, 2 * Math.PI
    );
    ctx.fill();
  }

  ctx.fillStyle='blue';
  ctx.font = "12px Arial";
  ctx.fillText(`Ping: ${currentLatency}`, 10, 20);
})

var currentLatency = 0;

socket.on('pong', function(latency) {
  currentLatency = latency;
});

