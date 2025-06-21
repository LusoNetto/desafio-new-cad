import type { flightType } from "../types/flightType"

export type tableType = {
  isLoading: boolean
  heads: string[]
  rows: flightType[]
}