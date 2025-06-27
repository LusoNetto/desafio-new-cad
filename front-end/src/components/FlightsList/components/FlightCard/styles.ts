import styled, { css } from 'styled-components'

interface ContentContainerProps {
  align?: 'start' | 'center' | 'end'
}

export const FlightCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL_200};

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`

export const ContentContainer = styled.div<ContentContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;

  ${({ align }) =>
    align &&
    css`
      align-items: ${align};
    `}
`

export const Label = styled.span`
  color: ${({ theme }) => theme.COLORS.NEUTRAL_500};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.XSMALL};
`

export const Value = styled.span`
  color: ${({ theme }) => theme.COLORS.NEUTRAL_900};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
`

export const BookmarkButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  border: none;
  background: none;

  &:hover {
    scale: 1.1;
    transition: scale 0.2s ease-in-out;
  }
`

export const FlightIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 100px;
`
