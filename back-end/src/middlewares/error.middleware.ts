import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../utils/looger';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message || 'Erro interno no servidor';

  logger.error(`[${status}] ${message}`);

  res.status(status).json({
    error: {
      status,
      message,
      timestamp: new Date().toISOString(),
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    }
  });
};