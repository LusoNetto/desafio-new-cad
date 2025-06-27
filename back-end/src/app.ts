// src/app.ts
import express from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import { routes } from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { logger } from './utils/looger';
import compression from 'compression';
import helmet from 'helmet';


const CORS_OPTIONS = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

export const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
  app.use(compression());
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(CORS_OPTIONS));

app.use((req, res, next) => {
  logger.info(`[${req.method}] ${req.path}`);
  next();
});

app.use('/v1', routes);

app.get('/health', (_req, res) => {
  res.status(StatusCodes.OK).json({ 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.use(errorHandler);

export const serverConfig = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'development'
};