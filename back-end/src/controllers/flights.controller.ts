import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import flights from '../utils/flights.json';

// Schema para possíveis query params (exemplo: origem, destino, data)
const flightsQuerySchema = z.object({
  origem: z.string().optional(),
  destino: z.string().optional(),
  data: z.string().optional()
});

export const getFlights = (req: Request, res: Response) => {
  try {
    const parseResult = flightsQuerySchema.safeParse(req.query);
    if (!parseResult.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Parâmetros de consulta inválidos',
        errors: parseResult.error.errors
      });
    }
    res.status(StatusCodes.OK).json(flights);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao buscar voos:', error.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        message: 'Erro ao carregar voos.',
        error: error.message 
      });
    } else {
      console.error('Erro desconhecido:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        message: 'Erro desconhecido ao carregar voos.' 
      });
    }
  }
};