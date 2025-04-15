import 'dotenv/config';
import server from './server/index.js';

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Socket.IO server running at http://localhost:${PORT}`);
});