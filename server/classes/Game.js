var Player = require('./StickMan');

class Game {

  constructor(io) {
    this.io = io;
    this.players = {};

    this.io.on("connection", (socket) => {
      io.sockets.emit("message", `Player at socket ${socket.id} has connected.`);
      this.players[socket.id] = new Player();

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
    this.io.sockets.emit("sendState", {
      players: this.players,
    });
  }
}

module.exports = Game;