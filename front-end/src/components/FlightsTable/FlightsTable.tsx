import type { flightType } from "../../types/flightType";
import type { tableType } from "../../types/tableType";
import Loading from "../Loading/Loading";

const FlightsTable = ({ isLoading, heads, rows }: tableType) => {
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
                  <td>Favoritado</td>
                  <td><button>Favoritar</button></td>
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