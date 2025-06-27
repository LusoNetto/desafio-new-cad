import styled from 'styled-components'

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1.5rem;
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.COLORS.NEUTRAL_0};
`

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.FONT_SIZE.LARGE};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.REGULAR};
  color: ${({ theme }) => theme.COLORS.NEUTRAL_600};

  margin-bottom: 1rem;
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.75fr 0.75fr 0.75fr 0.25fr;
  gap: 1rem;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const Label = styled.label`
  color: ${({ theme }) => theme.COLORS.NEUTRAL_600};
  font-size: ${({ theme }) => theme.FONT_SIZE.XSMALL};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.REGULAR};
`

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;

  border: 2px solid ${({ theme }) => theme.COLORS.NEUTRAL_200};

  color: ${({ theme }) => theme.COLORS.NEUTRAL_500};
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.REGULAR};
`

export const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;

  border: 2px solid ${({ theme }) => theme.COLORS.NEUTRAL_200};
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  width: 100%;
  padding: 0.85rem 1.5rem;
  border-radius: 0.5rem;

  margin-top: 1.5rem;
  cursor: pointer;

  border: none;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY_LIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL_50};

  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.REGULAR};

  &:hover {
    opacity: 0.8;
    transition: opacity 0.2s ease-in-out;
  }
`

export const ResetButton = styled.button`
  width: 100%;
  border-radius: 0.5rem;

  border: none;
  background-color: transparent;

  border: 2px solid ${({ theme }) => theme.COLORS.PRIMARY_LIGHT};

  color: ${({ theme }) => theme.COLORS.PRIMARY_LIGHT};

  margin-top: 1.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transition: opacity 0.2s ease-in-out;
  }
`
