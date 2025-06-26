import { useCallback, useEffect, useState } from 'react'

// SERVICES
import { FlightsService } from '@/api'

// TYPES
import type { RequestFlightDto } from '@/api'

type FilterFormData = {
  origin: string
  destination: string
  departure: string
  arrival: string
}

export const useFlight = () => {
  const [filteredFlights, setFilteredFlights] = useState(
    [] as RequestFlightDto[],
  )

  const [filter, setFilter] = useState({
    origin: '',
    destination: '',
    departure: '',
    arrival: '',
  })

  const [flights, setFlights] = useState([] as RequestFlightDto[])
  const [bookmarks, setBookmarks] = useState('{}')

  const [hasApiError, setHasApiError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const hasBookmark = (id: number) => {
    const bookmarksObject = JSON.parse(
      localStorage.getItem('bookmarks') || '{}',
    )
    return (
      typeof bookmarksObject[id] === 'string' &&
      (bookmarksObject[id] !== null || bookmarksObject[id] !== undefined)
    )
  }

  const getFlights = useCallback(async () => {
    try {
      setIsLoading(true)

      const flights = await FlightsService.getFlights()

      setFlights(flights)
    } catch (error) {
      console.error('error:' + error)
      setHasApiError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getLocalStorageBookmarks = useCallback(async () => {
    const bookmarks = localStorage.getItem('bookmarks')
    setBookmarks(bookmarks || '{}')
  }, [])

  const onFilter = async (data: FilterFormData) => {
    const { origin, destination, departure, arrival } = data

    setFilter({
      origin,
      destination,
      departure,
      arrival,
    })
  }

  const onFilterReset = async () => {
    setFilter({
      origin: '',
      destination: '',
      departure: '',
      arrival: '',
    })
  }

  const filterFlights = useCallback(() => {
    // Check if any filter is applied
    const hasActiveFilters =
      filter.origin || filter.destination || filter.departure || filter.arrival

    if (!hasActiveFilters) {
      setFilteredFlights(flights)
      return
    }

    const filteredFlights = flights.filter((flight) => {
      const originMatch = !filter.origin || flight.origin === filter.origin
      const destinationMatch =
        !filter.destination || flight.destination === filter.destination
      const departureMatch =
        !filter.departure || flight.departureDateTime === filter.departure
      const arrivalMatch =
        !filter.arrival || flight.arrivalDateTime === filter.arrival

      return originMatch && destinationMatch && departureMatch && arrivalMatch
    })

    setFilteredFlights(filteredFlights)
  }, [flights, filter])

  useEffect(() => {
    getLocalStorageBookmarks()
  }, [getLocalStorageBookmarks])

  useEffect(() => {
    getFlights()
  }, [getFlights])

  useEffect(() => {
    filterFlights()
  }, [filterFlights])

  return {
    hasBookmark,
    flights,
    filteredFlights,
    isLoading,
    hasApiError,
    bookmarks,
    setBookmarks,
    onFilter,
    onFilterReset,
  }
}
