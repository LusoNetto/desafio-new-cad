// src/routes/index.ts
import { Router } from 'express';
import { flightsRoute } from './flights.routes';
import { bookmarksRoute } from './bookmarks.routes';

export const routes = Router();

routes.use('/flights', flightsRoute);
routes.use('/bookmarks', bookmarksRoute);