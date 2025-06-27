import { api } from '../core'

import type { RequestBookmarkDto, PostBookmarkDto, DeleteBookmarkDto } from '../dtos'

export class BookmarksService {
  static async getBookmarks() {
    const { data } = await api.get<RequestBookmarkDto[]>('/bookmarks')
    return data
  }
  static async postBookmarks(props: PostBookmarkDto) {
    const { flightId } = props;
    await api.post('/bookmarks', { flightId: flightId })
  }

  static async deleteBookmarks(props: DeleteBookmarkDto) {
    const { flightId } = props;
    await api.delete(`/bookmarks/${ flightId }`)
  }
}
