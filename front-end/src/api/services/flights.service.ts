import { api } from '../core'

import type { RequestFlightDto } from '../dtos'

export class FlightsService {
  static async getFlights() {
    const { data } = await api.get<RequestFlightDto[]>('/flights')
    return data
  }
}
