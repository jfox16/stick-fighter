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
    if (this.frame < this.framesPerIndex - 1) {
      this.frame++;
    }
    else {
      if (this.index < this.numIndices) {
        this.frame = 0;
        this.index++;
      }
      else {
        if (this.loop) 
          this.reset();
        else
          this.isDone = true;
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