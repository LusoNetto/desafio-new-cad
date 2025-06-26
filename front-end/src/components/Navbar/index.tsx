import { NavLink } from 'react-router'
import { AirplaneTilt, Star } from 'phosphor-react'

import logo from '../../assets/logo.png'

import * as S from './styles'

export const Navbar = () => {
  return (
    <S.NavbarContainer>
      <S.Logo>
        <img src={logo} alt="Logo" />
      </S.Logo>

      <nav>
        <NavLink to="/flights" title="Vôos">
          <AirplaneTilt size={24} />
          <span>Vôos</span>
        </NavLink>

        <NavLink to="/bookmarks" title="Favoritos">
          <Star size={24} />
          <span>Favoritos</span>
        </NavLink>
      </nav>
    </S.NavbarContainer>
  )
}
