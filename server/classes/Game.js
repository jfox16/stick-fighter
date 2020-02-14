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

  doAttack(attack, position, attackerId) {
    Object.values(this.players).forEach((player) => {
      if (player.id !== attackerId) player.hurt();
    });
  }
}

module.exports = Game;