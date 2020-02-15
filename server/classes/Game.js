var Player = require('./StickMan');

class Game {

  constructor(io) {
    this.io = io;
    this.players = {};

    this.io.on("connection", (socket) => {
      io.sockets.emit("message", `Player at socket ${socket.id} has connected.`);
      this.players[socket.id] = new Player(this, socket.id);

      // set up event listeners
      socket.on("disconnect", (reason) => {
        io.sockets.emit("message", `Player at socket ${socket.id} has disconnected. Reason: ${reason}`);
        delete this.players[socket.id];
      });
  
      socket.on("setButton", ({button, value}) => {
        let player = this.players[socket.id];
        if (player) {
          player.setButton(button, value);
        }
      });
    })
  }

  update() {
    Object.values(this.players).forEach((player) => {
      if (player) player.update();
    });
  }

  sendState() {
    let players = Object.values(this.players).map((player) => {
      return player.getDrawInfo();
    });
    this.io.sockets.emit("sendState", {
      players: players,
    });
  }

  doAttack(attack, attacker) {
    Object.values(this.players).forEach((player) => {
      if (
        player.id !== attacker.id 
        && this.checkCollision(attack.hitbox, attacker.position, player.hurtbox, player.position)
      ) {
        player.hurt();
        attacker.animation.pause(5);
        player.animation.pause(5);
      }
    });
  }

  checkCollision(box1, box1Pos, box2, box2Pos) {
    return (
      box1Pos.x + box1.offset.x < box2Pos.x + box2.offset.x + box2.size.x
      && box1Pos.x + box1.offset.x + box1.size.x > box2Pos.x + box2.offset.x
      && box1Pos.y + box1.offset.y < box2Pos.y + box2.offset.y + box2.size.y
      && box1Pos.y + box1.offset.y + box1.size.y > box2Pos.y + box2.offset.y
    );
  }
}

module.exports = Game;