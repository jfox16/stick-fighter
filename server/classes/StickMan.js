const Animation = require('./Animation');

const actions = {
  NONE: 'none',
  ATTACK: {
    PUNCH: 'attack.punch'
  }
}

class StickMan {
  constructor() {
    this.position = {x: 400, y: 300};
    this.input = {};
    this.movespeed = {x: 6, y: 4};
    this.facingRight = false;

    this.animations = {
      stand: new Animation('stickman', 0, 2, 4, true),
      standR: new Animation('stickmanR', 0, 2, 4, true),
      run: new Animation('stickman', 3, 6, 3, true),
      runR: new Animation('stickmanR', 3, 6, 3, true),
      punch: new Animation('stickmanAttacks', 0, 5, 3, false),
      punchR: new Animation('stickmanAttacksR', 0, 5, 3, false),
    };

    this.animation = this.animations['stand'];
    this.action = actions.NONE;
  }

  update() {
    // Read inputs
    let xInput = 0;
    if (this.input.left) xInput--;
    if (this.input.right) xInput++;
    let yInput = 0;
    if (this.input.up) yInput--;
    if (this.input.down) yInput++;

    switch(this.action) {
      case actions.NONE:
        // MOVE
        this.position.x += xInput * this.movespeed.x;
        this.position.y += yInput * this.movespeed.y;

        // TURN
        if (xInput > 0)
          this.facingRight = true;
        else if (xInput < 0)
          this.facingRight = false;
    
        // SET STAND OR RUN ANIMATION
        if (xInput !== 0 || yInput !== 0)
          (!this.facingRight) ? this.animation = this.animations['run'] : this.animation = this.animations['runR'];
        else
          (!this.facingRight) ? this.animation = this.animations['stand'] : this.animation = this.animations['standR'];

        // PUNCH
        if (this.input.attack) {
          this.action = actions.ATTACK.PUNCH;
          this.animation = (!this.facingRight) ? this.animations['punch'] : this.animations['punchR'];
          this.animation.reset();
        }
        break;
      
      case actions.ATTACK.PUNCH:
        if (this.animation.index === 3) {
          console.log("PUNCH");
        }
        else if (this.animation.isDone()) {
          this.action = actions.NONE;
        }
        break;
    }

    // animate sprite
    this.animation.update();
  }

  setButton(button, value) {
    this.input[button] = value;
  }

  getDrawInfo() {
    return {
      position: this.position,
      facingRight: this.facingRight,
      animation: {
        spriteKey: this.animation.spriteKey,
        index: this.animation.index
      },
    }
  }
}

module.exports = StickMan;
