const DrawHandler = require("./classes/DrawHandler");

const socket = io();
socket.on("message", function(data) {
  console.log(data);
})

const keyMap = {
  87: 'up',
  83: 'down',
  65: 'left',
  68: 'right',
  75: 'attack',
}

var inputs = {}

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

const canvas = document.getElementById('canvas');
const drawHandler = new DrawHandler(canvas);

var currentLatency = 0;

// DRAW WHEN STATE IS RECEIVED
socket.on("sendState", function(state) {
  state.latency = currentLatency;
  drawHandler.draw(state);
})

socket.on('pong', function(latency) {
  currentLatency = latency;
});

