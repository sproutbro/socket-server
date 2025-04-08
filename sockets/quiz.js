export function registerQuizHandlers(socket) {
    console.log(`✅ [socket] User connected: ${socket.user}`);

    socket.on('test1', (data) => {
        console.log(`[quiz:submit] user=${socket?.user} score=${data}`);
        // TODO: DB 저장 처리 등
    });

    socket.on('disconnect', () => {
        console.log(`❌ [socket] User disconnected: ${socket.user.email}`);
    });
}