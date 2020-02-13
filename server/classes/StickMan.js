const Animation = require('./Animation');

class StickMan {
  constructor() {
    this.position = {x: 400, y: 300};
    this.input = {
      left: false,
      right: false,
      up: false,
      down: false,
      jump: false,
      attack: false
    };
    this.movespeed = {x: 6, y: 4};
    this.facingRight = false;

    this.animations = {
      stand: new Animation('stickman', 0, 2, 3, true),
      standR: new Animation('stickmanR', 0, 2, 3, true),
      run: new Animation('stickman', 3, 6, 2, true),
      runR: new Animation('stickmanR', 3, 6, 2, true)
    };

    this.animation = this.animations['stand'];
  }

  update() {
    // Move
    let xInput = 0;
    if (this.input.left) xInput--;
    if (this.input.right) xInput++;
    let yInput = 0;
    if (this.input.up) yInput--;
    if (this.input.down) yInput++;
    this.position.x += xInput * this.movespeed.x;
    this.position.y += yInput * this.movespeed.y;

    // animate sprite
    this.animation.update();

    if (xInput > 0)
      this.facingRight = true;
    else if (xInput < 0)
      this.facingRight = false;

    if (xInput !== 0 || yInput !== 0) {
      if (!this.facingRight)
        this.animation = this.animations['run'];
      else
        this.animation = this.animations['runR'];
    }
    else {
      if (!this.facingRight)
        this.animation = this.animations['stand'];
      else
        this.animation = this.animations['standR'];
    }
  }

  setButton(button, value) {
    this.input[button] = value;
  }

  getDrawInfo() {
    return {
      spriteKey: this.animation.spriteKey,
      index: this.animation.index,
      facingRight: this.facingRight,
    }
  }
}

module.exports = StickMan;
