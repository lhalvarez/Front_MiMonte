/* eslint-disable jsx-a11y/anchor-is-valid */
// Dependencies
import React, { Fragment } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
// Flow Props and Stats
type Props = {
  handleSelectNav: void,
  handleLogOut: void
}

function NavBarInstance(props: Props) {
  const { handleSelectNav, handleLogOut } = props
  const navItems = [
    { to: '/mimonte/boletas', label: 'Boletas' },
    { to: '/mimonte/pago', label: 'Pago en Línea' },
    { to: '/mimonte/movimientos', label: 'Movimientos' },
    { to: '/mimonte/registro-tarjetas', label: 'Métodos de pago' }
  ]

  function navigationItems() {
    return navItems.map(i => (
      <li className="nav-link" key={i.to}>
        <a
          href="#"
          onClick={e => {
            e.preventDefault()
            handleSelectNav(i.to)
          }}
        >
          {i.label}
        </a>
      </li>
    ))
  }

  return (
    <Fragment>
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Container>
          <Navbar.Collapse id="navbar-nav">
            <Nav>{navigationItems()}</Nav>
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
