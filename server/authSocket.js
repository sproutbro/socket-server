import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET;

export function authSocketMiddleware(socket, next) {
    try {
        const cookies = cookie.parse(socket.handshake.headers.cookie || '');
        const token = cookies.auth_token;

        if (token) {
            const user = jwt.verify(token, JWT_SECRET);
            if (user.id && user.nickname) {
                socket.user = { id: user.id, nickname: user.nickname };
            }
        } else {
            socket.user = { nickname: socket.id.slice(0, 5) };
        }

        console.log(`✅ [socket] User connected: ${socket.user.nickname}`);
        next();
    } catch (err) {
        next(new Error('Invalid or expired token'));
    }

    socket.on('disconnect', () => {
        console.log(`❌ [socket] User disconnected: ${socket.user.nickname}`);
    });
}
