import { useCallback, useEffect, useState } from 'react'

// SERVICES
import { FlightsService, BookmarksService } from '@/api'

// TYPES
import type { GetBookmarkDto, PostBookmarkDto, RequestFlightDto } from '@/api'

type FilterFormData = {
  origin: string
  destination: string
  departure: string
  arrival: string
}

export const useBookmark = () => {

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

  const getFlights = useCallback(async () => {
    try {
      setIsLoading(true)

      const flights = await FlightsService.getFlights()

      setFlights(flights.filter((flight) => isBookmarked({flightId: flight.flightNumber})))
    } catch (error) {
      console.error('error:' + error)
      setHasApiError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getLocalStorageBookmarks = () => {
    const bookmarksLocalStorage = localStorage.getItem('bookmarks')
    return bookmarksLocalStorage || "{}"
  }

  const isBookmarked = (props: GetBookmarkDto) => {
    const { flightId } = props;
    const bookmarksObject = JSON.parse(getLocalStorageBookmarks() || "{}");
    return !(bookmarksObject[flightId] !== 0 &&
      (bookmarksObject[flightId] === null ||
        bookmarksObject[flightId] === undefined));
  }

  const getBookmarks = async () => {
    try {
      const bookmarksReturned = await BookmarksService.getBookmarks()
      setBookmarks(JSON.stringify(bookmarksReturned))
      localStorage.setItem('bookmarks', JSON.stringify(bookmarksReturned))
    } catch (error) {
      console.error('error:' + error)
      setHasApiError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const postBookmark = async (props: PostBookmarkDto) => {
    try {
      setIsLoading(true)
      const { flightId } = props;
      await BookmarksService.postBookmarks({ flightId: flightId })
      const bookmarks = await BookmarksService.getBookmarks()
      setBookmarks(JSON.stringify(bookmarks))
    } catch (error) {
      console.error('error:' + error)
      setHasApiError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteBookmark = async (props: PostBookmarkDto) => {
    try {
      setIsLoading(true)
      const { flightId } = props;
      await BookmarksService.deleteBookmarks({ flightId: flightId })
      const bookmarks = await BookmarksService.getBookmarks()
      setBookmarks(JSON.stringify(bookmarks))
    } catch (error) {
      console.error('error:' + error)
      setHasApiError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const toogleBookmarkFlight = (props: GetBookmarkDto) => {
    try {
      const {flightId} = props;
      if(isBookmarked({flightId: flightId})) {
        deleteBookmark({flightId: flightId})
      } else {
        postBookmark({flightId:flightId})
      }
    } catch (error) {
      
    } finally {

    }
  }

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
    getFlights()
  }, [getFlights])
  
  useEffect(() => {
    getBookmarks()
  }, [getBookmarks])

  useEffect(() => {
    filterFlights()
  }, [filterFlights])

  return {
    flights,
    filteredFlights,
    isLoading,
    hasApiError,
    bookmarks,
    onFilter,
    onFilterReset,
    isBookmarked,
    toogleBookmarkFlight
  }
}
