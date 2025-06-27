import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handleServerError = (res: Response, error: unknown, context: string) => {
  const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
  console.error(`[BookmarksController] ${context}:`, errorMessage);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
    message: `Falha ao ${context}`,
    error: errorMessage 
  });
};
