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

    this.pauseFrames = 0;
    this.onIndexMethods = {};
  }

  update() {
    if (this.isDone) {
      return;
    }

    if (this.pauseFrames > 0) {
      this.pauseFrames--;
      return;
    }

    this.frame++;
    if (this.frame === this.framesPerIndex) {
      this.frame = 0;
      this.index++;

      if (this.onIndexMethods[this.index]) {
        this.onIndexMethods[this.index]();
      }

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

  onIndex(index, method) {
    this.onIndexMethods[index] = method;
  }

  pause(pauseFrames) {
    this.pauseFrames = pauseFrames;
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