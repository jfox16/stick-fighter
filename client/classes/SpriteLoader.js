
const Sprite = require("./Sprite");
const IMG_PATH = "/client/img";

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
      console.log(sprite);
      this.sprites[spriteKey] = sprite;
    });
  }
}

module.exports = SpriteLoader;
