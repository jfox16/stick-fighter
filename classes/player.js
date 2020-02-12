
class Player {
  constructor() {
    this.position = {x: 400, y: 300};
    this.inputs = {
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
    if (this.inputs.left) xInput--;
    if (this.inputs.right) xInput++;
    let yInput = 0;
    if (this.inputs.up) yInput--;
    if (this.inputs.down) yInput++;
    this.position.x += xInput * this.movespeed.x;
    this.position.y += yInput * this.movespeed.y;
  }

  setInput(key, value) {
    this.inputs[key] = value;
    console.log(this.inputs);
  }
}

module.exports = Player;
