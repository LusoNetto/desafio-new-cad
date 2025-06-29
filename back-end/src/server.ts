import express from 'express';
import { app } from './app';
import connectRedis from './redisServer';
import bodyParser from 'body-parser';

const PORT = 3000;
const server = express();

await connectRedis().catch(console.error);
server.use(bodyParser.json());
server.use('/', app);

server.listen(PORT, () => {
  console.log('Back-end running on port', PORT);
});
