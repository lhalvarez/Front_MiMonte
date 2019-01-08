import React, { Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'

import TextInput from 'Components/commons/TextInput'
import Button from 'Components/commons/Button'
import RegisteredCards from 'Components/CardRegistration/RegisteredCards'
import OpenPayForm from 'Components/CardRegistration/OpenPayForm'

import Styles from './RegistrationForm.less'

type Props = {
  form: Object,
  handleChange: void,
  handleClickAdd: void,
  handleShowCollapse: void,
  handleClickDelete: void,
  handleClickUpdate: void,
  cards: Array<Object>
}

function RegistrationForm(props: Props) {
  const {
    form,
    handleChange,
    handleClickAdd,
    handleShowCollapse,
    handleClickDelete,
    handleClickUpdate,
    cards
  } = props

  return (
    <Fragment>
      <Col xs={12}>
        <p className={Styles.titleCard}>Métodos de pago</p>
      </Col>
      <Row className={Styles.containPayMethod}>
        <Col xs={4} className={Styles.payment_methods}>
          <RegisteredCards
            form={form}
            styles={Styles}
            cards={cards}
            handleChange={handleChange}
            handleShowCollapse={handleShowCollapse}
            handleClickDelete={handleClickDelete}
            handleClickUpdate={handleClickUpdate}
          />
        </Col>
        <Col xs={1} />
        <Col md={6}>
          <p className={Styles.registration_title}>
            Registrar método de pago
            <br />
            <small className={Styles.registration_title_small}>
              CRÉDITO Y DÉBITO
            </small>
          </p>
          <OpenPayForm
            form={form}
            handleClickAdd={handleClickAdd}
            handleChange={handleChange}
            styles={Styles}
          />
          <Row>
            <Col xs={12}>
              <div className="form-row">
                <Col md={8}>
                  <TextInput
                    name="alias"
                    placeholder="Alias"
                    value={form.alias}
                    label="Alias"
                    type="text"
                    maxLength={20}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={4}>
                  <Button
                    variant="primary"
                    label="Agregar"
                    size="lg"
                    className={`float-right ${Styles.add_button}`}
                    id="pay-button"
                    onClick={handleClickAdd}
                    block
                  />
                </Col>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={1} />
      </Row>
    </Fragment>
  )
}

export default RegistrationForm
