import { useState } from "react";
import type { flightType } from "../../types/flightType";
import type { tableType } from "../../types/flightsTableType";
import Loading from "../Loading/Loading";

const FlightsTable = ({ isLoading, heads, rows }: tableType) => {

  const [bookmarks, setBookmarks] = useState(localStorage.getItem("bookmarks") || "{}")

  const toggleFavoriteFlight = (flightId: number) => {
    const bookmarksObject = JSON.parse(bookmarks);
    if (bookmarksObject[flightId] !== 0 && (bookmarksObject[flightId] === null || bookmarksObject[flightId] === undefined)) {
      console.log("Não tinha bookmarksObject[",flightId,"]");
      bookmarksObject[flightId] = flightId;
    } else {
      console.log("Tinha bookmarksObject[",flightId,"]");
      delete bookmarksObject[flightId]
    }
    console.log("bookmarksObject: ", bookmarksObject);
    const bookmarksUpdated = JSON.stringify(bookmarksObject);
    localStorage.setItem("bookmarks", bookmarksUpdated);
    setBookmarks(bookmarksUpdated);
  }

  const hasBookmark = (id: number) => {
    const bookmarksObject = JSON.parse(bookmarks);
    return typeof bookmarksObject[id] === "number" && (bookmarksObject[id] !== null || bookmarksObject[id] !== undefined)
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : !rows.length ? <p>nenhum resultado</p>
        : (
          <table>
            <thead>
              <tr>
                {heads.map(head => {
                  return <th key={head}>{head}</th>
                })}
              </tr>
            </thead>
            <tbody>

              {rows.map(({ id, flightNumber, company, origin, destination, departureDateTime, arrivalDateTime, price }: flightType) => {
                return (
                  <tr key={id}>
                    <td>{flightNumber}</td>
                    <td>{company}</td>
                    <td>{origin}</td>
                    <td>{destination}</td>
                    <td>{new Date(departureDateTime).toLocaleDateString()}</td>
                    <td>{new Date(arrivalDateTime).toLocaleDateString()}</td>
                    <td>{price}</td>
                    {!hasBookmark(id) ? <td></td> : <td>Favoritado</td>}
                    <td><button onClick={() => toggleFavoriteFlight(id)}>Favoritar</button></td>
                  </tr>)
              })
              }
            </tbody>
          </table>
        )
      }
    </>
  )
}

export default FlightsTable;