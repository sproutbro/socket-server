import { stage1 } from "./data/stage1.js";
import { createPlayer } from "./object/player.js";

export function cityHandlers(io) {
    const users = new Map();

    io.on('connection', (socket) => {
        const player = createPlayer(socket);
        users.set(socket.id, player);

        socket.broadcast.emit('user-joined', users.get(socket.id));
        socket.emit("current-users", Array.from(users.values()));

        socket.on("stage", () => {
            socket.emit("stage", stage1[1]);
        })

        socket.on('disconnect', () => {
            users.delete(socket.id);
            socket.broadcast.emit('user-disconnect', socket.id);
        });
    })
}
