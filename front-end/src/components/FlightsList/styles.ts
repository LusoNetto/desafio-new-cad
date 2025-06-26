import styled from 'styled-components'

export const FlightsListContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 2.5rem;

  padding: 1.5rem;
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.COLORS.NEUTRAL_0};
`

export const FlightsListEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  color: ${({ theme }) => theme.COLORS.NEUTRAL_300};
`

export const Description = styled.p`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};

  text-align: center;
`
