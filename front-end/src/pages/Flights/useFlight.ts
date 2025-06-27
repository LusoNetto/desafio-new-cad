import { useCallback, useEffect, useState } from 'react'

// SERVICES
import { FlightsService, BookmarksService } from '@/api'

// TYPES
import type { RequestFlightDto } from '@/api'

type FilterFormData = {
  origin: string
  destination: string
  departure: string
  arrival: string
}

export const useFlight = () => {
  const [filteredFlights, setFilteredFlights] = useState<RequestFlightDto[]>([])
  const [flights, setFlights] = useState<RequestFlightDto[]>([])
  const [bookmarkedFlights, setBookmarkedFlights] = useState<
    RequestFlightDto[]
  >([])
  const [filter, setFilter] = useState<FilterFormData>({
    origin: '',
    destination: '',
    departure: '',
    arrival: '',
  })
  const [hasApiError, setHasApiError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleError = (error: unknown) => {
    console.error('Error:', error)
    setHasApiError(true)
  }

  const getFlights = useCallback(async () => {
    try {
      setIsLoading(true)
      const flights = await FlightsService.getFlights()
      setFlights(flights)
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getBookmarks = useCallback(async () => {
    try {
      const { flightIds = [] } = await BookmarksService.getBookmarks()
      console.log('flightIds', flightIds)
      const bookmarkedFlights = flights.filter((flight) =>
        flightIds.includes(flight.id),
      )
      console.log('bookmarkedFlights', bookmarkedFlights)
      setBookmarkedFlights(bookmarkedFlights)
    } catch (error) {
      handleError(error)
    }
  }, [flights])

  const updateBookmarks = useCallback(
    (flight: RequestFlightDto, isAdding: boolean) => {
      setBookmarkedFlights((prev) =>
        isAdding
          ? [...prev, flight]
          : prev.filter((bookmarked) => bookmarked.id !== flight.id),
      )
    },
    [],
  )

  const toggleBookmark = async (flightId: number) => {
    try {
      setIsLoading(true)

      const flight = flights.find((f) => f.id === flightId)

      if (!flight) throw new Error('Voo não encontrado')

      const isBookmarked = bookmarkedFlights.some((f) => f.id === flightId)

      if (isBookmarked) {
        await BookmarksService.deleteBookmarks({ flightId })
      } else {
        await BookmarksService.postBookmarks({ flightId })
      }

      updateBookmarks(flight, !isBookmarked)
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onFilter = (data: FilterFormData) => setFilter(data)

  const onFilterReset = () =>
    setFilter({ origin: '', destination: '', departure: '', arrival: '' })

  const filterFlights = useCallback(() => {
    const hasActiveFilters = Object.values(filter).some(Boolean)

    if (!hasActiveFilters) {
      setFilteredFlights(flights)
      return
    }

    const filtered = flights.filter(
      (flight) =>
        (!filter.origin || flight.origin === filter.origin) &&
        (!filter.destination || flight.destination === filter.destination) &&
        (!filter.departure || flight.departureDateTime === filter.departure) &&
        (!filter.arrival || flight.arrivalDateTime === filter.arrival),
    )

    setFilteredFlights(filtered)
  }, [flights, filter])

  useEffect(() => {
    getFlights()
  }, [getFlights])

  useEffect(() => {
    if (flights.length > 0) getBookmarks()
  }, [flights, getBookmarks])

  useEffect(() => {
    filterFlights()
  }, [filterFlights])

  return {
    flights,
    filteredFlights,
    bookmarkedFlights,
    isLoading,
    hasApiError,
    onFilter,
    onFilterReset,
    onToogleBookmarkFlight: toggleBookmark,
  }
}
