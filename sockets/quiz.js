let players = {};

export function registerQuizHandlers(socket, io) {
    console.log(`✅ [socket] User connected: ${socket.id}`);

    const nickname = socket?.user?.nickname ?? socket.id
    players[socket.id] = { nickname }

    io.emit("newPlayer", nickname);
    io.emit('playerUpdate', players);

    socket.emit("updateGame", quizData);

    socket.on("answer", (data) => {
        const quizData = checkAnswer(data);
        io.emit("updateGame", quizData);
    })

    socket.on("chatMsg", (msg) => {
        io.emit("chatMsg", msg)
    })

    socket.on('disconnect', () => {
        io.emit("playerDisconnected", players[socket.id].nickname);
        delete players[socket.id];
        io.emit('playerUpdate', players);
        console.log(`❌ [socket] User disconnected: ${socket.id}`);
    });
}

function checkAnswer(data) {
    const { key, answer } = data;

    if (answerData[key] === answer) {
        quizData[key].answer = answer;
    };

    return quizData;
}

const quizData = {
    "1": { direction: 'x', hint: '1. 중국의 수도는?', length: 3, row: 0, col: 0 },
    "2": { direction: 'y', hint: '2. 몽골 제국을 세운 정복자, 세계를 떨게 한 그의 이름은?', length: 4, row: 0, col: 2 },
    "3": { direction: 'x', hint: '3. 말을 타고 싸우는 군사?', length: 3, row: 1, col: 2 },
    "4": { direction: 'y', hint: '4. 병이 있어도 오래 사는 것?', length: 4, row: 0, col: 4 },
    "5": { direction: 'x', hint: '5. 기름을 뿌린 닭고기 라는 뜻의 음식?', length: 3, row: 0, col: 4 },
    "6": { direction: 'y', hint: '6. 어떤 사건이나 인물을 기리기 위해 세운 비석?', length: 3, row: 0, col: 6 },
    "7": { direction: 'x', hint: '7. 몸이나 옷에 묻은 때나 얼룩 따위를 씻어내거나 뺄 때 쓰는 세정제?', length: 2, row: 2, col: 6 },
    
};

const answerData = {
    "1": "베이징",
    "2": "징기즈칸",
    "3": "기마병",
    "4": "유병장수",
    "5": "유린기",
    "6": "기념비",
    "7": "비누",
}