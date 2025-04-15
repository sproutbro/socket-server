let players = {};

export function registerQuizHandlers(io) {
    let quizData = JSON.parse(JSON.stringify(quizData1));

    io.on('connection', (socket) => {
        const nickname = socket?.user?.nickname;
        players[socket.id] = { nickname, score: 0 };
        io.emit("updatePlayers", players);
        socket.emit("updateQuiz", quizData);
        socket.broadcast.emit("updateChat", `${nickname} 님 연결`);

        socket.on("updateChat", (msg) => {
            io.emit("updateChat", `${nickname}:${msg}`);
        })

        socketAnswer(socket);

        socket.on('disconnect', () => {
            delete players[socket.id];
            socket.broadcast.emit("updateChat", `${nickname} 님 종료`);
            socket.broadcast.emit('playerUpdate', players);
        });
    });


    function socketAnswer(socket) {
        socket.on("answer", ({ key, answer }) => {
            if (answerData[key] === answer) {
                players[socket.id].score += 10;
                io.emit("updatePlayers", players);
                io.emit("updateChat", `${socket?.user?.nickname}님 ${key}번 정답`);

                quizData[key].answer = answer;
                checkQuizData();

                io.emit("updateQuiz", quizData);
            } else {
                socket.emit("updateChat", "정답이 아닙니다.");
            }
        })
    }

    function checkQuizData() {
        const count = Object.values(quizData).filter(obj => !obj.hasOwnProperty('answer')).length;
        if (!count) {
            quizData = JSON.parse(JSON.stringify(quizData1));
        }
    }
}


const quizData1 = {
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