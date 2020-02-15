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
      size: {x: 56, y: 24},
      offset: {x: -56, y: -12}
    }
  },
  punchR: {
    hitbox: {
      size: {x: 56, y: 24},
      offset: {x: 0, y: -12}
    }
  }
}

class StickMan {
  constructor(game, id) {
    this.game = game;
    this.id = id;
    this.position = {x: 400, y: 300};
    this.hurtbox = {
      size: {x: 44, y: 12},
      offset: {x: -22, y: -6}
    };
    this.movespeed = {x: 6, y: 4};
    this.facingRight = false;
    this.input = {};

    this.animations = {
      stand: new Animation('stickman', 0, 3, 4, true),
      standR: new Animation('stickmanR', 0, 3, 4, true),
      run: new Animation('stickman', 3, 4, 3, true),
      runR: new Animation('stickmanR', 3, 4, 3, true),
      hurt: new Animation('stickman', 7, 5, 3, false),
      hurtR: new Animation('stickmanR', 7, 5, 3, false),
      punch: new Animation('stickmanAttacks', 0, 6, 3, false),
      punchR: new Animation('stickmanAttacksR', 0, 6, 3, false),
    };

    this.animations.punch.onIndex( 3, () => {this.game.doAttack(attacks.punch, this)} );
    this.animations.punchR.onIndex( 3, () => {this.game.doAttack(attacks.punchR, this)} );

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
        if (this.animation.isDone) {
          this.action = actions.NONE;
          this.animation = (!this.facingRight) ? this.animations['stand'] : this.animations['standR'];
        }
        break;
      
      case actions.ATTACK.PUNCH:
        if (this.animation.isDone) {
          this.action = actions.NONE;
          this.animation = (!this.facingRight) ? this.animations['stand'] : this.animations['standR'];
        }
        break;
    }
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
        index: this.animation.getDrawIndex(),
      },
    }
  }
}

module.exports = StickMan;
