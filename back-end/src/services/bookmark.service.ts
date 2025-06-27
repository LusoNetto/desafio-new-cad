import { client } from '../redisServer';

const BOOKMARKS_KEY = 'bookmarks';
const SEVEN_DAYS_IN_SECONDS = 604800;

export const getAllBookmarks = async () => {
  const bookmarksData = await client.get(BOOKMARKS_KEY);
  return bookmarksData ? JSON.parse(bookmarksData) : {};
};

export const saveBookmarks = async (bookmarks: Record<string, any>) => {
  await client.set(BOOKMARKS_KEY, JSON.stringify(bookmarks), {
    EX: SEVEN_DAYS_IN_SECONDS,
  });
};

export const addBookmark = async (flightId: number) => {
  const bookmarks = await getAllBookmarks();
  if (bookmarks[flightId]) {
    return false;
  }
  bookmarks[flightId] = flightId;
  await saveBookmarks(bookmarks);
  return true;
};

export const removeBookmark = async (flightId: number) => {
  const bookmarks = await getAllBookmarks();
  if (!(flightId in bookmarks)) {
    return false;
  }
  delete bookmarks[flightId];
  await saveBookmarks(bookmarks);
  return true;
};
