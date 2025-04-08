export function registerGameAEvents(io, socket) {
    socket.on('gameA:join', (data) => {
        console.log('[gameA] join:', data);
        // 예시: 유저 입장
        socket.join('gameA-room');
        socket.emit('gameA:welcome', `환영해요, ${data.name}`);
    });

    socket.on('gameA:score', (score) => {
        console.log('[gameA] 점수:', score);
        // 브로드캐스트 예시
        socket.to('gameA-room').emit('gameA:new-score', score);
    });
}
