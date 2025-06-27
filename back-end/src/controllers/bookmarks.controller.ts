// src/controllers/bookmarks.controller.ts
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { client } from '../redisServer';
import { bookmarkBodySchema, bookmarkParamsSchema } from '../validators/bookmarks.schema';
import { handleServerError } from '../utils/errorHandler';

const SEVEN_DAYS_IN_SECONDS = 604800;

export const getBookmarks = async (req: Request, res: Response) => {
  try {
    const bookmarks = await client.get('bookmarks');
    res.status(StatusCodes.OK).json(bookmarks ? JSON.parse(bookmarks) : {});
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

    const bookmarksData = await client.get('bookmarks');
    const bookmarks = bookmarksData ? JSON.parse(bookmarksData) : {};

    if (bookmarks[flightId]) {
      res.status(StatusCodes.CONFLICT).json({
        message: `Bookmark with ID ${flightId} already exists`
      });
      return;
    }

    bookmarks[flightId] = flightId;
    await client.set('bookmarks', JSON.stringify(bookmarks), {
      EX: SEVEN_DAYS_IN_SECONDS
    });

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

    const bookmarksData = await client.get('bookmarks');
    if (!bookmarksData) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'No bookmarks found'
      });
      return;
    }

    const bookmarks = JSON.parse(bookmarksData);  
    if (!bookmarks[flightId]) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `Bookmark with ID ${flightId} not found`
      });
      return;
    }

    delete bookmarks[flightId];
    await client.set('bookmarks', JSON.stringify(bookmarks));

    res.status(StatusCodes.OK).json({ 
      message: 'Bookmark deleted successfully' 
    });
  } catch (error) {
    handleServerError(res, error, 'delete bookmark');
  }
};