import type { FlightType } from '../../pages/Flights/types'

export type FlightsTableProps = {
  isLoading: boolean
  heads: string[]
  rows: Array<FlightType>
  bookmarks: string
  setBookmarks: React.Dispatch<React.SetStateAction<string>>
}
