import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import flights from '../utils/flights.json';

// Schema for possible query params (e.g., origin, destination, date)
const flightsQuerySchema = z.object({
  origin: z.string().optional(),
  destination: z.string().optional(),
  date: z.string().optional()
});

export const getFlights = (req: Request, res: Response) => {
  try {
    const parseResult = flightsQuerySchema.safeParse(req.query);
    if (!parseResult.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid query parameters',
        errors: parseResult.error.errors
      });
    }
    res.status(StatusCodes.OK).json(flights);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching flights:', error.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        message: 'Error loading flights.',
        error: error.message 
      });
    } else {
      console.error('Unknown error:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        message: 'Unknown error loading flights.' 
      });
    }
  }
};