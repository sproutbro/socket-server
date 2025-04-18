export function createPlayer(socket) {
    return {
        userId: socket?.user?.id,
        nickname: socket?.user?.nickname,
        id: socket.id,
        x: Math.floor(Math.random() * 640),
        y: Math.floor(Math.random() * 360),
        texture: "player",
        maxHp: 100,
        hp: 100,
        speed: 100
    }
}