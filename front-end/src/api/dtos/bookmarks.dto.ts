export type RequestBookmarkDto = {
  flightIds: number[]
}

export type PostBookmarkDto = {
  flightId: number
}

export type DeleteBookmarkDto = {
  flightId: number
}

export type GetBookmarkDto = {
  flightId: number
}
