var Player = require('./player');

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
  
      socket.on("setButton", (input) => {
        let player = this.players[socket.id];
        if (player) {
          player.setButton(input.button, input.value);
        }
      });
    })
  }

  update() {
    Object.values(this.players).forEach((player) => {
      if (player) player.update();
    });

    this.io.sockets.emit("players", this.players);
  }
}

module.exports = Game;