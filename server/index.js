import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { authSocketMiddleware } from './authSocket.js';
import { registerQuizHandlers } from '../sockets/quiz/quiz.js';
import { battleHandlers } from '../sockets/battle/index.js';

const ORIGIN = process.env.ORIGIN;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ORIGIN,
        credentials: true
    }
});

const quizNamespace = io.of("/quiz");
quizNamespace.use(authSocketMiddleware);
registerQuizHandlers(quizNamespace);

const battleNamespace = io.of("/battle");
battleNamespace.use(authSocketMiddleware);
battleHandlers(battleNamespace);

export default server;
