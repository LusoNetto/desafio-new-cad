import { api } from '../core'

import type { RequestFlightsDto } from '../dtos'

export class FlightsService {
  static async getFlights() {
    const { data } = await api.get<RequestFlightsDto[]>('/flights')
    return data
  }
}
