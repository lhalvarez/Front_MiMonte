/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react'
import { Row, Col, Collapse } from 'react-bootstrap'

import TextInput from 'Components/commons/TextInput'
import Button from 'Components/commons/Button'

import logoVisa from 'SharedImages/logo-visa.png'
// import logoMasterCard from 'SharedImages/logo-mastercard.png'

type Props = {
  styles: Object
}

function RegisteredCards(props: Props) {
  const { styles } = props

  return (
    <Fragment>
      <Row>
        <Col md={12}>
          <div className={styles.instructions_methods}>
            <p className={`${styles.p_my_methods} text-left`}>
              Mis métodos de pago
              <br />
              <small className={styles.small_my_methods}>
                Puedes guardar hasta 3 métodos
              </small>
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Row>
            <Col md={3}>
              <img
                src={logoVisa}
                className="img-fluid d-block mx-auto"
                alt="logo-visa"
              />
            </Col>
            <Col md={5}>
              <p className={styles.p_alias_text}>
                Principal
                <br />
                <small className={styles.small_alias_text}>
                  **** **** *** 1234
                </small>
              </p>
            </Col>
            <Col md={2}>
              <a>Editar</a>
            </Col>
            <Col md={2}>
              <a>Eliminar</a>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Collapse in={false}>
                <Row>
                  <Col md={9}>
                    <TextInput
                      name="alias"
                      placeholder="Alias"
                      value=""
                      label="Alias"
                      type="password"
                      maxLength={50}
                      // eslint-disable-next-line no-console
                      onChange={() => console.log('Aqui')}
                    />
                  </Col>
                  <Col md={3}>
                    <Button
                      variant="primary"
                      label="Guardar"
                      size="lg"
                      className="float-right mt-4"
                      // eslint-disable-next-line no-console
                      onClick={() => console.log('Here')}
                      block
                    />
                  </Col>
                </Row>
              </Collapse>
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  )
}

export default RegisteredCards
