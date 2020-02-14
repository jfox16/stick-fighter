(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const SpriteLoader = require("./SpriteLoader");

class DrawHandler {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    let spriteLoader = new SpriteLoader();
    this.sprites = spriteLoader.sprites;
  }

  draw(state) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (state.players) {
      state.players.sort((a, b) => {
        return a.position.y - b.position.y;
      })
      state.players.forEach((player) => {
        // draw player image
        this.sprites['stickmanShadow'].draw(this.context, player.position.x, player.position.y);
        let {spriteKey, index} = player.animation;
        this.sprites[spriteKey].drawIndex(this.context, index, player.position.x, player.position.y);
      });
    }

    if (state.latency) {
      this.context.fillStyle='blue';
      this.context.font = "12px Arial";
      this.context.fillText(`Ping: ${state.latency}`, 10, 20);
    }
  }
}

module.exports = DrawHandler;
},{"./SpriteLoader":3}],2:[function(require,module,exports){
class Sprite {
  constructor(image, cellSize, offset) {
    this.image = image;
    this.cellSize = cellSize;
    this.offset = offset;
  }

  draw(context, x, y) {
    this.drawIndex(context, 0, x, y);
  }

  drawIndex(context, index, x, y) {
    context.drawImage(
      this.image,
      this.cellSize.x * index,
      0,
      this.cellSize.x,
      this.cellSize.y,
      x + this.offset.x,
      y + this.offset.y,
      this.cellSize.x,
      this.cellSize.y,
    );
  }
}

module.exports = Sprite;
},{}],3:[function(require,module,exports){

const Sprite = require("./Sprite");
const IMG_PATH = "/img";

const spriteData = [
  {
    spriteKey: 'stickman',
    filename: 'stickman.png',
    cellSize: {x: 64, y: 64},
    offset: {x: -32, y: -62}
  },
  {
    spriteKey: 'stickmanR',
    filename: 'stickmanR.png',
    cellSize: {x: 64, y: 64},
    offset: {x: -32, y: -62}
  },
  {
    spriteKey: 'stickmanAttacks',
    filename: 'stickmanAttacks.png',
    cellSize: {x: 128, y: 64},
    offset: {x: -96, y: -62}
  },
  {
    spriteKey: 'stickmanAttacksR',
    filename: 'stickmanAttacksR.png',
    cellSize: {x: 128, y: 64},
    offset: {x: -32, y: -62}
  },
  {
    spriteKey: 'stickmanShadow',
    filename: 'stickmanShadow.png',
    cellSize: {x: 64, y: 32},
    offset: {x: -32, y: -16}
  }
];

class SpriteLoader {
  constructor() {
    this.sprites = {};
    
    spriteData.forEach(({spriteKey, filename, cellSize, offset}) => {
      let image = new Image();
      image.src = IMG_PATH + '/' + filename;
      let sprite = new Sprite(image, cellSize, offset);
      this.sprites[spriteKey] = sprite;
    });
  }
}

module.exports = SpriteLoader;


},{"./Sprite":2}],4:[function(require,module,exports){
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


},{"./classes/DrawHandler":1}]},{},[4]);
