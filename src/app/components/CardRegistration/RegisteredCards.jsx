/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react'
import { Row, Col, Collapse, Card } from 'react-bootstrap'

import TextInput from 'Components/commons/TextInput'
import Button from 'Components/commons/Button'
import RegistrationInstructions from 'Components/CardRegistration/RegistrationInstructions'
import OpenPayInfo from 'Components/CardRegistration/OpenPayInfo'

import logoVisa from 'SharedImages/logo-visa.svg'
import logoMasterCard from 'SharedImages/logo-mastercard.svg'

type Props = {
  form: Object,
  styles: Object,
  cards: Array<mixed>,
  handleChange: void,
  handleShowCollapse: void,
  handleClickDelete: void,
  handleClickUpdate: void,
  form: Object
}

function RegisteredCards(props: Props) {
  const {
    form,
    styles,
    handleChange,
    handleShowCollapse,
    handleClickDelete,
    handleClickUpdate,
    cards
  } = props

  const noCards = <RegistrationInstructions styles={styles} />

  const cardItem = item => (
    <Col md={12}>
      <Card className="pay_method-card">
        <Card.Body>
          <div className="logo-card">
            <img
              src={item.tipo === 'Visa' ? logoVisa : logoMasterCard}
              className="img-fluid d-block mx-auto"
              alt="logo-card"
            />
          </div>
          <div className="alias-card">
            <p>
              {item.alias}
              <br />
              <small>
                **** **** **** &nbsp;
                {item.digitos}
              </small>
            </p>
          </div>
          <div className="actioners-card">
            <a href="#" name={item.referencia} onClick={handleShowCollapse}>
              Editar
            </a>
            <a href="#" name={item.referencia} onClick={handleClickDelete}>
              Eliminar
            </a>
          </div>
        </Card.Body>
        <Collapse in={form[`alias-${item.referencia}`]}>
          <Card.Footer>
            <TextInput
              name={item.referencia}
              value={form[item.referencia]}
              label="Alias"
              placeholder="Alias"
              onChange={handleChange}
            />
            <div>
              <a href="#" name={item.referencia} onClick={handleShowCollapse}>
                Cancelar
              </a>
              <Button
                name={item.referencia}
                label="Guardar"
                className="float-right"
                onClick={handleClickUpdate}
              />
            </div>
          </Card.Footer>
        </Collapse>
      </Card>
    </Col>
  )

  const regisCards = (
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
      <Row>{cards.map(i => cardItem(i))}</Row>
      <OpenPayInfo styles={styles} />
    </Fragment>
  )

  return <Fragment>{cards.length === 0 ? noCards : regisCards}</Fragment>
}

export default RegisteredCards
