import styled from 'styled-components'

export const GenericErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 1rem;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.COLORS.ERROR_MAIN};

  color: ${({ theme }) => theme.COLORS.ERROR_MAIN};

  h1 {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
    font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  }
`
