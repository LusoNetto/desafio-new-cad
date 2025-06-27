// src/routes/bookmarks.routes.ts
import { Router } from 'express';
import { 
  getBookmarks, 
  createBookmark, 
  deleteBookmark 
} from '../controllers/bookmarks.controller';

export const bookmarksRoute = Router();

bookmarksRoute.get('/', getBookmarks);
bookmarksRoute.post('/', createBookmark);
bookmarksRoute.delete('/:flightId', deleteBookmark);