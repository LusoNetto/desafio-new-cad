export type FilterDataType = {
  origin: string
  destination: string
  departure: string
  arrival: string
}

export type FilterProps = {
  onFilter: (data: FilterDataType) => void
  onFilterReset: () => void
  inBookmarksPage?: boolean
}
