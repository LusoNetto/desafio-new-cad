import type { tableType } from '../../types/flightsTableType';
import type { flightType } from '../../types/flightType';
import Loading from '../Loading/Loading';
import api from '../../services/api';
import { useState } from 'react';

const BookmarksTable = ({ isLoading, heads, rows }: tableType) => {
    const [bookmarks, setBookmarks] = useState(
        localStorage.getItem('bookmarks') || '{}'
    );

    const toggleFavoriteFlight = async (flightNumber: number) => {
        const flightId = flightNumber.toString();
        const bookmarksObject = await api.get("/bookmarks").then((response) => response.data) || JSON.parse(bookmarks);
        if (
            bookmarksObject[flightId] !== 0 &&
            (bookmarksObject[flightId] === null ||
                bookmarksObject[flightId] === undefined)
        ) {            
            bookmarksObject[flightId] = flightId;
            await api.post(`/bookmarks`, {"flightId": flightId});
        } else {            
            delete bookmarksObject[flightId];
            await api.delete(`/bookmarks/${flightId}`);
        }        
        const bookmarksUpdated = JSON.stringify(bookmarksObject);
        localStorage.setItem('bookmarks', bookmarksUpdated);
        setBookmarks(bookmarksUpdated);
    };

    const hasBookmark = (id: number) => {
        const bookmarksObject = JSON.parse(bookmarks);
        return (
            typeof bookmarksObject[id] === 'string' &&
            (bookmarksObject[id] !== null || bookmarksObject[id] !== undefined)
        );
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : !rows.filter((row: flightType) => hasBookmark(row.id))
                .length ? (
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
                        {rows
                            .filter((row: flightType) => hasBookmark(row.id))
                            .map(
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
                                                {new Date(
                                                    departureDateTime
                                                ).toLocaleDateString()}
                                            </td>
                                            <td>
                                                {new Date(
                                                    arrivalDateTime
                                                ).toLocaleDateString()}
                                            </td>
                                            <td>{price}</td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        toggleFavoriteFlight(id)
                                                    }
                                                >
                                                    Desfavoritar
                                                </button>
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

export default BookmarksTable;
