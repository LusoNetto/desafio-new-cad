import { Router } from 'express';
import { getFlights } from '../controllers/flights.controller';

export const flightsRoute = Router();

flightsRoute.get('/', getFlights);