import * as bookmarkService from '../services/bookmark.service';

jest.mock('../redisServer', () => {
  let store: Record<string, string> = {};
  return {
    client: {
      isOpen: true,
      get: jest.fn(async (key: string) => store[key] || null),
      set: jest.fn(async (key: string, value: string) => {
        store[key] = value;
      }),
      quit: jest.fn(async () => {
        store = {};
      }),
      connect: jest.fn(async () => {
        store = {};
      })
    }
  };
});

describe('Bookmark Service', () => {
  it('should add and remove a bookmark', async () => {
    const flightId = 1234;
    let bookmarks = await bookmarkService.getAllBookmarks();
    expect(bookmarks[flightId]).toBeUndefined();
    await bookmarkService.addBookmark(flightId);
    bookmarks = await bookmarkService.getAllBookmarks();
    expect(bookmarks[flightId]).toBe(flightId);
    await bookmarkService.removeBookmark(flightId);
    bookmarks = await bookmarkService.getAllBookmarks();
    expect(bookmarks[flightId]).toBeUndefined();
  });
});
