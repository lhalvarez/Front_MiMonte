import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// Images
import logo from 'SharedImages/logo-NMP.png'

type Props = {
  userInfo: Object
}

function NavHeader(props: Props) {
  const { userInfo } = props

  return (
    <Container className="container-header">
      <Row className="main-header">
        <Col xs={12} md={3}>
          <img src={logo} className="img-fluid d-block mx-auto" alt="" />
        </Col>
        <Col md={{ span: 4, offset: 5 }} xs={{ span: 8, offset: 2 }}>
          <div className="user-welcome">
            <p>
              Bienvenido
              <br />
              <small>{userInfo.fullName}</small>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default NavHeader
