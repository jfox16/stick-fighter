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
  let key = keyMap[e.keyCode];
  // only emit if input has changed
  if (key !== undefined && inputs[key] === false) {
    inputs[key] = true;
    socket.emit("setInput", {key: key, value: true});
  }
});

document.addEventListener("keyup", function(e) {
  let key = keyMap[e.keyCode];
  // only emit if input has changed
  if (key !== undefined && inputs[key] === true) {
    inputs[key] = false;
    socket.emit("setInput", {key: key, value: false});
  }
});

socket.on("disconnect", () => {
  socket.emit("player disconnected");
});

socket.emit('player connected');

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext("2d");

var playerImg = new Image();
playerImg.onload = () => {
  console.log("done loading!");
}
playerImg.src = "/sprites/stickman-placeholder.png";

socket.on("players", function(players) {
  context.clearRect(0, 0, 800, 600);
  context.fillStyle='gray';
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(
      player.position.x, 
      player.position.y,
      10, 0, 2 * Math.PI
    );
    context.fill();

    if (playerImg.complete && playerImg.naturalHeight !== 0) {
      console.log("drawing!!");
      context.drawImage(playerImg, player.position.x, player.position.y);
    }
    else {
      console.log("not drawing");
    }
  }
})
