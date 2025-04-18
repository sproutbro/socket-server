import Player from "./class/Player.js";

export function battleHandlers(io) {
    let players = {};

    io.on('connection', (socket) => {
        players[socket.id] = new Player(socket);

        Object.keys(players).forEach((key) => {
            socket.emit("newPlayer", { key, player: players[key] });
        })

        socket.broadcast.emit("newPlayer", { key: socket.id, player: players[socket.id] });

        socket.on("drawMove", () => socket.emit("drawMove", players[socket.id]));

        socket.on("movePlayer", ({ x, y }) => {
            players[socket.id].x = x;
            players[socket.id].y = y;
            players[socket.id].move = 0;
            io.emit("movePlayer", { key: socket.id, x, y });
            countMove(players[socket.id]);
        });

        socket.on('disconnect', () => {
            delete players[socket.id];
            socket.broadcast.emit('disconnectPlayer', socket.id);
        });

        function countMove(player) {
            socket.emit("drawMoveGa", player.move);
            const intervalId = setInterval(() => {
                player.move++;
                socket.emit("drawMoveGa", player.move);

                if (player.maxMove === player.move) {
                    clearInterval(intervalId);
                }
            }, 1000);
        }
    })

}
