// STYLES
import * as S from './styles'

// TYPES
import type { FilterProps, FilterDataType } from './types'
import { MagnifyingGlass, Trash } from 'phosphor-react'
import { useForm } from 'react-hook-form'

export const Filter = (props: FilterProps) => {
  const { onFilter, onFilterReset } = props
  const { register, handleSubmit, reset, getValues } = useForm<FilterDataType>()

  const handleReset = () => {
    reset({ origin: '', destination: '', departure: '', arrival: '', search: '' })
    onFilterReset()
  }

  const handleFilter = (data: FilterDataType) => {
    onFilter({ ...data, search: '' })
  }

  const handleSearch = () => {
    const { search } = getValues()
    onFilter({ origin: '', destination: '', departure: '', arrival: '', search })
  }

  return (
    <S.FilterContainer>
      <S.FormContainer>
        <S.InputsContainer>
          <S.InputFilterContainer>
            <S.Label>Origem:</S.Label>
            <S.Select {...register('origin')}>
              <option value="">Selecione</option>
              <option value="São Paulo">São Paulo</option>
              <option value="Minas Gerais">Minas Gerais</option>
              <option value="Espirito Santo">Espirito Santo</option>
              <option value="Bahia">Bahia</option>
            </S.Select>
          </S.InputFilterContainer>

          <S.InputFilterContainer>
            <S.Label>Destino:</S.Label>
            <S.Select {...register('destination')}>
              <option value="">Selecione</option>
              <option value="São Paulo">São Paulo</option>
              <option value="Minas Gerais">Minas Gerais</option>
              <option value="Espirito Santo">Espirito Santo</option>
              <option value="Bahia">Bahia</option>
            </S.Select>
          </S.InputFilterContainer>

          <S.InputFilterContainer>
            <S.Label>Partida em:</S.Label>
            <S.Input type="date" {...register('departure')} />
          </S.InputFilterContainer>

          <S.InputFilterContainer>
            <S.Label>Chegada em:</S.Label>
            <S.Input type="date" {...register('arrival')} />
          </S.InputFilterContainer>

          <S.Button type="button" onClick={handleSubmit(handleFilter)}>
            <MagnifyingGlass size={18} />
            Filtrar
          </S.Button>

          <S.ResetButton type="button" onClick={handleReset}>
            <Trash size={18} />
          </S.ResetButton>
        </S.InputsContainer>
        <S.InputsContainer>
          <S.InputSearchContainer>
            <S.Label>Buscar:</S.Label>
            <S.Input
              {...register('search')}
              type="search"
              id="default-search"
              placeholder="Digite aqui..."
            />
          </S.InputSearchContainer>
          <S.Button type="button" onClick={handleSearch}>
            <MagnifyingGlass size={18} />
            Buscar
          </S.Button>
        </S.InputsContainer>
      </S.FormContainer>
    </S.FilterContainer>
  )
}
