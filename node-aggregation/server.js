const {createServer} = require('http');
const {config} = require("dotenv")
config();
const app = require('./app');
const PORT = process.env.PORT || 3000;
const {connectMongo, disconnectMongo} = require('./mongo/connect_mongo');

const server = createServer();

server.on('request', app);
server.on('error', (err) => {
    console.error('Server error:', err);
});

const startServer = async () => {
    try {
        await connectMongo(process.env.MONGO_URI);
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

startServer();
// process.on('SIGINT', async () => {
//     console.log('Received SIGINT. Shutting down gracefully...');
//     try {
//         await disconnectMongo();
//         server.close(() => {
//             console.log('Server closed');
//             process.exit(0);
//         });
//     } catch (error) {
//         console.error('Error during shutdown:', error);
//         process.exit(1);
//     }
// });