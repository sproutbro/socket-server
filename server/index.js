import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { authSocketMiddleware } from './authSocket.js';
import { registerQuizHandlers } from '../sockets/quiz.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3014',
        credentials: true
    }
});

io.use(authSocketMiddleware);

io.on('connection', (socket) => {
    registerQuizHandlers(socket);
});

export default server;
