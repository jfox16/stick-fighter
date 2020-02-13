class Animation {
  constructor(spriteKey, startIndex=0, endIndex=0, framesPerIndex=0, loop=true) {
    this.spriteKey = spriteKey;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
    this.framesPerIndex = framesPerIndex;
    this.loop = loop;

    this.frame = 0;
    this.index = startIndex;
  }

  update() {
    this.frame++;
    if (this.frame >= this.framesPerIndex) {
      this.frame %= this.framesPerIndex;
      this.index++;
      if (this.index > this.endIndex) {
        this.index = this.startIndex
      }
    }
  }
}

module.exports = Animation;