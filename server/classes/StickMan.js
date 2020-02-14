const Animation = require('./Animation');

const actions = {
  NONE: 'none',
  HURT: 'hurt',
  ATTACK: {
    PUNCH: 'attack.punch'
  },
}

const attacks = {
  punch: {
    hitbox: {
      size: {x: 64, y: 20},
      offset: {x: -64, y: -10}
    }
  },
  punchR: {
    hitbox: {
      size: {x: 64, y: 20},
      offset: {x: 0, y: -10}
    }
  }
}

class StickMan {
  constructor(game) {
    this.game = game;
    this.position = {x: 400, y: 300};
    this.hurtbox = {
      size: {x: 44, y: 12},
      offset: {x: -22, y: -6}
    };
    this.movespeed = {x: 6, y: 4};
    this.facingRight = false;
    this.input = {};

    this.animations = {
      stand: new Animation('stickman', 0, 2, 4, true),
      standR: new Animation('stickmanR', 0, 2, 4, true),
      run: new Animation('stickman', 3, 6, 3, true),
      runR: new Animation('stickmanR', 3, 6, 3, true),
      hurt: new Animation('stickman', 7, 10, 4, false),
      hurtR: new Animation('stickmanR', 7, 10, 4, false),
      punch: new Animation('stickmanAttacks', 0, 5, 3, false),
      punchR: new Animation('stickmanAttacksR', 0, 5, 3, false),
    };

    this.action = actions.NONE;
    this.animation = this.animations['stand']; 
  }

  update() {
    // Read inputs
    let xInput = 0;
    if (this.input.left) xInput--;
    if (this.input.right) xInput++;
    let yInput = 0;
    if (this.input.up) yInput--;
    if (this.input.down) yInput++;

    this.animation.update();

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
        if (xInput === 0 && yInput === 0)
          this.animation = (!this.facingRight) ? this.animations['stand'] : this.animations['standR'];
        else
          this.animation = (!this.facingRight) ? this.animations['run'] : this.animations['runR'];

        // PUNCH
        if (this.input.attack) {
          this.action = actions.ATTACK.PUNCH;
          this.animation = (!this.facingRight) ? this.animations['punch'] : this.animations['punchR'];
          this.animation.reset();
        }
        break;

      case actions.HURT:
        if (this.animation.isDone()) {
          this.action = actions.NONE;
        }
      
      case actions.ATTACK.PUNCH:
        if (this.animation.index === 3) {
          let attack = (!this.facingRight) ? attacks.punch : attacks.punchR;
          this.game.doAttack(attack, this.position);
        }
        if (this.animation.isDone()) {
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

  hurt() {
    this.action = actions.HURT;
    this.animation = (!this.facingRight) ? this.animations.hurt : this.animations.hurtR;
    this.animation.reset();
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
