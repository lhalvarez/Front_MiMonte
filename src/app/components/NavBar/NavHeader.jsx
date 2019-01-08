/* eslint-disable default-case */
// Dependencies
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// Images
import logo from 'SharedImages/logo-NMP.png'
import estrellaPlata from 'SharedImages/ico-usuario-plata.svg'
import estrellaOro from 'SharedImages/ico-usuario-oro.svg'
import estrellaPlatino from 'SharedImages/ico-usuario-platino.svg'
import estrellaOroPlus from 'SharedImages/ico-usuario-oro-mas.svg'
import estrellaOroPlusEspecial from 'SharedImages/ico-usuario-oro-mas-especial.svg'
import estrellaOroEspecial from 'SharedImages/ico-usuario-oro-especial.svg'
import estrellaPlatinoPlus from 'SharedImages/ico-usuario-platino-mas.svg'
// Flow Props and Stats
type Props = {
  userInfo: Object
}

function NavHeader(props: Props) {
  const { userInfo } = props
  const clientLevel = () => {
    switch (userInfo.clientLevel) {
      case 'BRONCE':
        return { classes: 'bronce', image: estrellaPlata, text: 'Bronce' }
      case 'PLATA':
        return { classes: 'plata', image: estrellaPlata, text: 'Plata' }
      case 'ORO':
        return { classes: 'oro', image: estrellaOro, text: 'Oro' }
      case 'ORO_MAS':
        return { classes: 'oro', image: estrellaOroPlus, text: 'Oro+' }
      case 'ORO _MASESPECIAL':
        return {
          classes: 'oro',
          image: estrellaOroPlusEspecial,
          text: 'Oro+ Especial'
        }
      case 'ORO_ESPECIAL':
        return {
          classes: 'oro',
          image: estrellaOroEspecial,
          text: 'Oro Especial'
        }
      case 'PLATINO':
        return { classes: 'platino', image: estrellaPlatino, text: 'Platino' }
      case 'PLATINO_MAS':
        return {
          classes: 'platino',
          image: estrellaPlatinoPlus,
          text: 'Platino+'
        }
      default:
        return ''
    }
  }

  return (
    <Container className="container-header">
      <Row className="main-header">
        <Col xs={12} md={3}>
          <img src={logo} className="img-fluid d-block mx-auto" alt="" />
        </Col>
        <Col md={{ span: 4, offset: 5 }} xs={{ span: 8, offset: 2 }}>
          <Row>
            <Col xs={9} className="user-welcome text-right">
              <p className="text-capitalize mb-0 mt-3">
                {userInfo.fullName ? userInfo.fullName.toLowerCase() : ''}
              </p>
              <p className={`${clientLevel().classes} plata mt-0`}>
                Cliente Nivel
                <span className="font-weight-bold">
                  &nbsp;
                  {clientLevel().text}
                </span>
              </p>
            </Col>
            <Col xs={3} className="my-auto ">
              <img
                src={clientLevel().image}
                className="img-fluid"
                alt="Cliente Nivel Plata"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default NavHeader
