export function registerGameBEvents(io, socket) {
    socket.on('gameB:ping', () => {
        socket.emit('gameB:pong');
    });

    socket.on('gameB:chat', (msg) => {
        socket.broadcast.emit('gameB:chat', msg);
    });
}
