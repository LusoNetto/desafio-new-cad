import styled from 'styled-components'

export const NavbarContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 1200px;
  margin: 5rem auto 0;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;

    max-width: 250px;
    border-radius: 10rem;
    padding: 0.75rem;

    background-color: ${({ theme }) => theme.COLORS.NEUTRAL_0};

    border: 2px solid ${({ theme }) => theme.COLORS.PRIMARY_LIGHT};

    width: 100%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    width: 100%;

    color: ${({ theme }) => theme.COLORS.NEUTRAL_500};

    &.active {
      border-color: ${({ theme }) => theme.COLORS.PRIMARY_LIGHT};
      color: ${({ theme }) => theme.COLORS.PRIMARY_LIGHT};
    }

    &:hover {
      opacity: 0.7;
      transition: opacity 0.2s ease-in-out;
    }
  }
`

export const Logo = styled.div`
  width: 50px;
  height: 50px;

  margin-right: 1rem;

  border-radius: 50%;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid ${({ theme }) => theme.COLORS.PRIMARY_LIGHT};

  img {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }
`
