import type { tableType } from '../../types/flightsTableType';
import type { flightType } from '../../types/flightType';
import Loading from '../Loading/Loading';
import api from '../../services/api';
import { useEffect } from 'react';
import useFlight from '../../hooks/useFlight';

const Table = ({ isLoading, heads, rows, bookmarks, setBookmarks }: tableType) => {
  const { hasBookmark } = useFlight();

  const toggleFavoriteFlight = async (flightNumber: number) => {
    const flightId = flightNumber.toString();
    const bookmarksObject = JSON.parse(bookmarks);
    if (
      bookmarksObject[flightId] !== 0 &&
      (bookmarksObject[flightId] === null ||
        bookmarksObject[flightId] === undefined)
    ) {
      bookmarksObject[flightId] = flightId;
      await api.post(`/bookmarks`, { flightId: flightId });
    } else {
      delete bookmarksObject[flightId];
      await api.delete(`/bookmarks/${flightId}`);
    }
    const bookmarksUpdated = JSON.stringify(bookmarksObject);
    localStorage.setItem('bookmarks', bookmarksUpdated);
    setBookmarks(bookmarksUpdated);
  };

  useEffect(() => {
    api.get('/bookmarks').then((response) => {
      setBookmarks(JSON.stringify(response.data));
    });
  }, [bookmarks]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : !rows.length ? (
        <p>nenhum resultado</p>
      ) : (
        <table>
          <thead>
            <tr>
              {heads.map((head) => {
                return <th key={head}>{head}</th>;
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
              }: flightType) => {
                return (
                  <tr key={id}>
                    <td>{flightNumber}</td>
                    <td>{company}</td>
                    <td>{origin}</td>
                    <td>{destination}</td>
                    <td>
                      {new Date(departureDateTime).toLocaleDateString()}
                    </td>
                    <td>{new Date(arrivalDateTime).toLocaleDateString()}</td>
                    <td>{price}</td>
                    <td>
                      {hasBookmark(flightNumber) ? (
                        <button onClick={() => toggleFavoriteFlight(id)}>
                          ⭐
                        </button>
                      ) : (
                        <button onClick={() => toggleFavoriteFlight(id)}>
                          Favoritar
                        </button>
                      )}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Table;
