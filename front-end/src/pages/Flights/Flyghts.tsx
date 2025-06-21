import { useEffect, useState } from "react";
import api from "../../services/api";
import FlightsTable from "../../components/FlightsTable/FlightsTable";
import Error from "../Error/Error";
import type { flightType } from "../../types/flightType";
import { convertDataBaseDateToFormDate } from "../../utils/dateConverter";

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrorApi, setHasErrorApi] = useState(false);
  const [flightFilterForm, setFlightFilterForm] = useState({
    origin: "São Paulo",
    destination: "São Paulo",
    departureDateTime: ""
  });

  const heads = [
    "Número do voo",
    "Companhia",
    "Origem",
    "Destino",
    "Partida",
    "Chegada",
    "Preco",
    "Favorito",
    ""
  ]

  useEffect(() => {
    api
      .get("/flights")
      .then((response) => {
        setIsLoading(false);
        setFlights(response.data)
      })
      .catch((err) => {
        setHasErrorApi(true);
        console.error("error:" + err);
      });
  }, []);

  const handleFilterFlightsSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await api
      .get("/flights")
      .then((response) => {
        setIsLoading(false);
        const returnedFights = response.data;
        const filteredFlights = returnedFights.filter((flight: flightType) => flight.origin === flightFilterForm.origin && flight.destination === flightFilterForm.destination && convertDataBaseDateToFormDate(flight.departureDateTime) === flightFilterForm.departureDateTime)
        setFlights(filteredFlights);
      })
      .catch((err) => {
        setHasErrorApi(true);
        console.error("error:" + err);
      });
  }

  return (
    <>
      {
        !hasErrorApi ?
          (
            <>
              <h1>Flights</h1>
              <form onSubmit={handleFilterFlightsSubmit}>
                <label>
                  Origem:
                  <select
                    name="origem"
                    onChange={(e) =>
                      setFlightFilterForm((prev) => ({ ...prev, origin: e.target.value }))
                    }
                    defaultValue="São Paulo"
                  >
                    <option value="São Paulo">São Paulo</option>
                    <option value="Minas Gerais">Minas Gerais</option>
                    <option value="Espirito Santo">Espirito Santo</option>
                    <option value="Bahia">Bahia</option>
                  </select>
                </label>
                <label>
                  Destino:
                  <select
                    name="destino"
                    onChange={(e) =>
                      setFlightFilterForm((prev) => ({ ...prev, destination: e.target.value }))
                    }
                    defaultValue="São Paulo"
                  >
                    <option value="São Paulo">São Paulo</option>
                    <option value="Minas Gerais">Minas Gerais</option>
                    <option value="Espirito Santo">Espirito Santo</option>
                    <option value="Bahia">Bahia</option>
                  </select>
                </label>
                <label>
                  Data:
                  <input
                    type="date"
                    name="data"
                    onChange={(e) => {
                      setFlightFilterForm((prev) => ({ ...prev, departureDateTime: e.target.value }))
                    }}
                  />
                </label>
                <input type="submit" value="Filtrar" />
              </form>
              <FlightsTable heads={heads} isLoading={isLoading} rows={flights} />
            </>
          ) :
          (
            <Error pageOfError="Flights" />
          )
      }
    </>
  );
};

export default Flights;