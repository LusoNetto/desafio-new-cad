import type { Dispatch, SetStateAction } from 'react'

import type { FlightType } from '@/pages/Flights/types'

export type FilterProps = {
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setFlights: Dispatch<SetStateAction<FlightType[]>>
  setHasErrorApi: Dispatch<SetStateAction<boolean>>
  inBookmarksPage?: boolean
}

export type FilterDataType = {
  origin: string
  destination: string
  departure: string
  arrival: string
  search: string
  price: string
}
