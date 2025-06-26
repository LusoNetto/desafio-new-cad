export type RequestBookmarkDto = {
  [key: string] : string
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
