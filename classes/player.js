
class Player {
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
    this.movespeed = {x: 5, y: 3};
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
  }

  setButton(button, value) {
    this.input[button] = value;
  }
}

module.exports = Player;
