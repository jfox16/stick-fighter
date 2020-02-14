class Animation {
  constructor(spriteKey='placeholder', startIndex=0, numIndices=1, framesPerIndex=1, loop=true) {
    this.spriteKey = spriteKey;
    this.startIndex = startIndex;
    this.numIndices = numIndices;
    this.framesPerIndex = framesPerIndex;
    this.loop = loop;

    this.isDone = false;
    this.frame = 0;
    this.index = 0;
  }

  update() {
    if (!this.isDone) {
      this.frame++;
      if (this.frame === this.framesPerIndex) {
        this.frame = 0;
        this.index++;
        if (this.index === this.numIndices) {
          if (this.loop) {
            this.frame = 0;
            this.index = 0;
          }
          else {
            this.index = this.numIndices - 1;
            this.isDone = true;
          }
        }
      }
    }
  }

  reset() {
    this.isDone = false;
    this.frame = 0;
    this.index = 0;
  }

  getDrawIndex() {
    return this.startIndex + this.index;
  }
}

module.exports = Animation;