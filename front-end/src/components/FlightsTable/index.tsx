import type { FlightType } from '../../pages/Flights/types'
import Loading from '../Loading/Loading'
import { api } from '../../api/core/axios-api'
import { useEffect } from 'react'
import { useFlight } from '../../pages/Flights/useFlight'
import { Table } from '../Table/Table'
import { Response } from '../Response/Response'
import { FaStar } from 'react-icons/fa6'
import { CiStar } from 'react-icons/ci'

// TYPES
import type { FlightsTableProps } from './types'

export const FlightsTable = (props: FlightsTableProps) => {
  const { isLoading, heads, rows, bookmarks, setBookmarks } = props

  const { hasBookmark } = useFlight()

  const toggleFavoriteFlight = async (flightNumber: number) => {
    const flightId = flightNumber.toString()
    const bookmarksObject = JSON.parse(bookmarks)
    if (
      bookmarksObject[flightId] !== 0 &&
      (bookmarksObject[flightId] === null ||
        bookmarksObject[flightId] === undefined)
    ) {
      bookmarksObject[flightId] = flightId
      await api.post(`/bookmarks`, { flightId: flightId })
    } else {
      delete bookmarksObject[flightId]
      await api.delete(`/bookmarks/${flightId}`)
    }
    const bookmarksUpdated = JSON.stringify(bookmarksObject)
    localStorage.setItem('bookmarks', bookmarksUpdated)
    setBookmarks(bookmarksUpdated)
  }

  useEffect(() => {
    api.get('/bookmarks').then((response) => {
      setBookmarks(JSON.stringify(response.data))
    })
  }, [bookmarks])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : !rows.length ? (
        <Response>Nenhum resultado encontrado...</Response>
      ) : (
        <Table>
          <thead>
            <tr>
              {heads.map((head) => {
                return <th key={head}>{head}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map(
              ({
                id,
                flightNumber,
                company,
                origin,
                destination,
                departureDateTime,
                arrivalDateTime,
                price,
              }: FlightType) => {
                return (
                  <tr key={id}>
                    <td>{flightNumber}</td>
                    <td>{company}</td>
                    <td>{origin}</td>
                    <td>{destination}</td>
                    <td>{new Date(departureDateTime).toLocaleDateString()}</td>
                    <td>{new Date(arrivalDateTime).toLocaleDateString()}</td>
                    <td>{price}</td>
                    <td onClick={() => toggleFavoriteFlight(id)}>
                      {hasBookmark(flightNumber) ? <FaStar /> : <CiStar />}
                    </td>
                  </tr>
                )
              },
            )}
          </tbody>
        </Table>
      )}
    </>
  )
}
