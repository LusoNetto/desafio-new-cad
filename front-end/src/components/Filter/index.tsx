import { useForm } from 'react-hook-form'
import { convertDataBaseDateToFormDate } from '../../utils/dateConverter'
import type { FlightType } from '../../pages/Flights/types'
import { api } from '../../api/core/axios-api'
import { useFlight } from '../../pages/Flights/useFlight'
import { Button } from '../Button/Button'
import { SubmitConteiner } from '../SubmitConteiner/SubmitConteiner'

// STYLES
import * as S from './styles'

// TYPES
import type { FilterProps, FilterDataType } from './types'
import { MagnifyingGlass, Trash } from 'phosphor-react'

export const Filter = (props: FilterProps) => {
  const { setIsLoading, setFlights, setHasErrorApi, inBookmarksPage } = props

  const { register, handleSubmit } = useForm()
  const { hasBookmark } = useFlight()

  const onFilter = async (data: FilterDataType) => {
    const { origin, destination, departure, arrival, search } = data
    console.log(origin, destination, departure, arrival, search)
    setIsLoading(true)
    await api
      .get('/flights')
      .then((response) => {
        setIsLoading(false)
        const filteredFlights = response.data.filter(
          (flight: FlightType) =>
            flight.origin === origin ||
            flight.origin === origin ||
            flight.destination === destination ||
            convertDataBaseDateToFormDate(flight.departureDateTime) ===
              departure ||
            convertDataBaseDateToFormDate(flight.arrivalDateTime) === arrival ||
            search === flight.flightNumber.toString() ||
            search === flight.company ||
            search === flight.origin ||
            search === flight.destination ||
            search ===
              new Date(flight.departureDateTime).toLocaleDateString() ||
            search === new Date(flight.arrivalDateTime).toLocaleDateString() ||
            search === flight.price,
        )
        console.log(filteredFlights)
        setFlights(filteredFlights)
      })
      .catch((err) => {
        setHasErrorApi(true)
        console.error('error:' + err)
      })
  }

  const onResetTable = async () => {
    setIsLoading(true)
    await api
      .get('/flights')
      .then((response) => {
        setIsLoading(false)
        if (inBookmarksPage) {
          setFlights(
            response.data.filter((row: FlightType) => hasBookmark(row.id)),
          )
        } else {
          setFlights(response.data)
        }
      })
      .catch((err) => {
        setHasErrorApi(true)
        console.error('error:' + err)
      })
  }

  return (
    <S.FilterContainer>
      <S.FormContainer>
        {/* <Label>
            Search:
            <Input
              {...register('search')}
              type="search"
              id="default-search"
              placeholder="Digite aqui..."
              required
            />
            <Button
              color="blue"
              type="submit"
              onClick={handleSubmit((data) => onFilter(data as FilterDataType))}
            >
              Pesquisar
            </Button>
          </Label> */}

        <S.InputsContainer>
          <S.InputContainer>
            <S.Label>Origem:</S.Label>
            <S.Select {...register('origin')}>
              <option value="Selecione">Selecione</option>
              <option value="São Paulo">São Paulo</option>
              <option value="Minas Gerais">Minas Gerais</option>
              <option value="Espirito Santo">Espirito Santo</option>
              <option value="Bahia">Bahia</option>
            </S.Select>
          </S.InputContainer>

          <S.InputContainer>
            <S.Label>Destino:</S.Label>
            <S.Select {...register('destination')}>
              <option value="Selecione">Selecione</option>
              <option value="São Paulo">São Paulo</option>
              <option value="Minas Gerais">Minas Gerais</option>
              <option value="Espirito Santo">Espirito Santo</option>
              <option value="Bahia">Bahia</option>
            </S.Select>
          </S.InputContainer>

          <S.InputContainer>
            <S.Label>Partida:</S.Label>
            <S.Input type="date" {...register('departure')} />
          </S.InputContainer>

          <S.InputContainer>
            <S.Label>Chegada:</S.Label>
            <S.Input type="date" {...register('arrival')} />
          </S.InputContainer>

          <S.Button
            type="submit"
            onClick={handleSubmit((data) => onFilter(data as FilterDataType))}
          >
            <MagnifyingGlass size={18} />
            Buscar
          </S.Button>

          <S.ResetButton type="button" onClick={onResetTable}>
            <Trash size={18} />
          </S.ResetButton>
        </S.InputsContainer>
      </S.FormContainer>
    </S.FilterContainer>
  )
}
