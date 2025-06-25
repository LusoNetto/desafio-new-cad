import type { tableType } from './types/TableType';
import type { FlightType } from '../../pages/Flights/types/FlightType';
import Loading from '../Loading/Loading';
import api from '../../services/api';
import { useEffect } from 'react';
import useFlight from '../../pages/Flights/hooks/useFlight';

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
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              {heads.map((head) => {
                return <th key={head}  scope="col" className="px-6 py-3" >{head}</th>;
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
                  <tr key={id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{flightNumber}</th>
                    <td className="px-6 py-4">{company}</td>
                    <td className="px-6 py-4">{origin}</td>
                    <td className="px-6 py-4">{destination}</td>
                    <td className="px-6 py-4">
                      {new Date(departureDateTime).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{new Date(arrivalDateTime).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{price}</td>
                    <td className="px-6 py-4" onClick={() => toggleFavoriteFlight(id)}>
                      {hasBookmark(flightNumber) ? (
                        <div className='cursor-pointer'>
                          ⭐
                        </div>
                      ) : (
                        <button className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline">Favoritar</button>
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
