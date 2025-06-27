// src/controllers/bookmarks.controller.ts
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { bookmarkBodySchema, bookmarkParamsSchema } from '../validators/bookmarks.schema';
import { handleServerError } from '../utils/errorHandler';
import { getAllBookmarks, addBookmark, removeBookmark } from '../services/bookmark.service';

export const getBookmarks = async (_req: Request, res: Response) => {
  try {
    const bookmarks = await getAllBookmarks();
    const flightIds = Object.values(bookmarks).map(Number);
    res.status(StatusCodes.OK).json({ flightIds });
    return;
  } catch (error) {
    handleServerError(res, error, 'fetch bookmarks');
  }
};

export const createBookmark = async (req: Request, res: Response) => {
  try {
    const parseResult = bookmarkBodySchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid data',
        errors: parseResult.error.errors
      });
      return;
    }
    const { flightId } = parseResult.data;
    const created = await addBookmark(flightId);
    if (!created) {
      res.status(StatusCodes.CONFLICT).json({
        message: `Bookmark with ID ${flightId} already exists`
      });
      return;
    }
    res.status(StatusCodes.CREATED).json(flightId);
  } catch (error) {
    handleServerError(res, error, 'create bookmark');
  }
};

export const deleteBookmark = async (req: Request, res: Response) => {
  try {
    const parseResult = bookmarkParamsSchema.safeParse(req.params);
    if (!parseResult.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid parameter',
        errors: parseResult.error.errors
      });
      return;
    }
    const { flightId } = parseResult.data;
    const deleted = await removeBookmark(flightId);
    if (!deleted) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `Bookmark with ID ${flightId} not found`
      });
      return;
    }
    res.status(StatusCodes.OK).json({ 
      message: 'Bookmark deleted successfully' 
    });
  } catch (error) {
    handleServerError(res, error, 'delete bookmark');
  }
};