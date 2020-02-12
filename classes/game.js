var Player = require('./player');

class Game {

  constructor(io) {
    this.io = io;
    this.players = {};

    this.io.on("connection", (socket) => {
      // set up event listeners
      socket.on("player connected", () => {
        socket.emit("message", `Player at socket ${socket.id} has connected.`);
        this.players[socket.id] = new Player();
        console.log(this.players);
      });
  
      socket.on("player disconnected", () => {
        socket.emit("message", `Player at socket ${socket.id} has disconnected.`);
        delete this.players[socket.id];
      });
  
      socket.on("setInput", (input) => {
        let player = this.players[socket.id];
        if (player) {
          player.setInput(input.key, input.value);
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