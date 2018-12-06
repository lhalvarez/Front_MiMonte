// Dependencies
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'
// Flow Props and Stats
type Props = {
  handleLogOut: void
}

function NavBarInstance(props: Props) {
  const { handleLogOut } = props

  return (
    <Fragment>
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Container>
          <Navbar.Collapse id="navbar-nav">
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
                <Link to="/mimonte/registro-tarjetas">Métodos de pago</Link>
              </li>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link onClick={handleLogOut}>Cerrar sesión</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  )
}

export default NavBarInstance
