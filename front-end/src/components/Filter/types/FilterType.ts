import type { Dispatch, SetStateAction } from "react"
import type { FlightType } from "../../../pages/Flights/types/FlightType"

export type FilterType = {
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setFlights: Dispatch<SetStateAction<FlightType[]>>
  setHasErrorApi: Dispatch<SetStateAction<boolean>>
  inBookmarksPage?: boolean 
}