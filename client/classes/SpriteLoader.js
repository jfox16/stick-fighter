
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

