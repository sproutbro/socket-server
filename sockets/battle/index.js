import { createPlayer } from "./event/player.js";

export function battleHandlers(io) {
    const users = new Map();

    io.on('connection', (socket) => {
        const player = createPlayer(socket);
        users.set(socket.id, player);

        socket.broadcast.emit('user-joined', users.get(socket.id));
        socket.emit("current-users", Array.from(users.values()));

        socket.on('disconnect', () => {
            users.delete(socket.id);
            socket.broadcast.emit('user-disconnect', socket.id);
        });

        socket.on("player-move", ({ x, y }) => {
            const player = users.get(socket.id);
            player.x = x;
            player.y = y;
            console.log(users.get(socket.id));
            io.emit("player-move", player);
        });
    })
}
