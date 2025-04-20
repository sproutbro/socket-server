export function createPlayer(socket) {
    return {
        userId: socket?.user?.id,
        nickname: socket?.user?.nickname,
        id: socket.id
    }
}
