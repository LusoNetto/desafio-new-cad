import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors());

app.use('/v1', routes);

export default app;
