export type FilterDataType = {
  origin: string
  destination: string
  departure: string
  arrival: string
  search?: string // novo campo para busca por texto
}

export type FilterProps = {
  onFilter: (data: FilterDataType) => void
  onFilterReset: () => void
  inBookmarksPage?: boolean
}
