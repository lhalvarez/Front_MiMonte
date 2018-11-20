// Dependencies
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavLink from 'react-bootstrap/lib/NavLink'
import Container from 'react-bootstrap/lib/Container'
import NavbarCollapse from 'react-bootstrap/lib/NavbarCollapse'
import NavbarToggle from 'react-bootstrap/lib/NavbarToggle'

type Props = {
  handleLogOut: void
}

function NavBarInstance(props: Props) {
  const { handleLogOut } = props

  return (
    <Fragment>
      <Navbar expand="lg">
        <NavbarToggle aria-controls="navbar-nav" />
        <Container>
          <NavbarCollapse id="navbar-nav">
            <Nav>
              <li className="nav-link">
                <Link to="/mimonte/inicio">Inicio</Link>
              </li>
              <li className="nav-link">
                <Link to="/mimonte/boletas">Boletas</Link>
              </li>
              <li className="nav-link">
                <Link to="/mimonte/pago">Pago en Línea</Link>
              </li>
              <li className="nav-link">
                <Link to="/mimonte/movimientos">Movimientos</Link>
              </li>
              <li className="nav-link">
                <Link to="/mimonte/registro-tarjetas">
                  Registro de Tarjetas
                </Link>
              </li>
            </Nav>
          </NavbarCollapse>
          <NavbarCollapse id="navbar-nav" className="justify-content-end">
            <Nav>
              <NavLink onClick={handleLogOut}>Cerrar sesión</NavLink>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </Fragment>
  )
}

export default NavBarInstance
