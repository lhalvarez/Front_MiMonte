/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react'
import { Row, Col, Collapse } from 'react-bootstrap'

import OpenPayInfo from 'Components/CardRegistration/OpenPayInfo'
import OpenPayForm from 'Components/CardRegistration/OpenPayForm'
import Button from 'Components/commons/Button'
import TextInput from 'Components/commons/TextInput'
import Checkbox from 'Components/commons/Checkbox'

// Images
import noBoletas from 'SharedImages/icon-mas-boletas.svg'
import logoVisa from 'SharedImages/logo-visa.svg'
import logoMasterCard from 'SharedImages/logo-mastercard-lineal.svg'

import style from './PayOnLine.less'

type Props = {
  partidas: Array<mixed>,
  cards: Array<mixed>,
  handleChange: any,
  removePartida: any,
  onPay: any,
  form: Object,
  disabledOpenPayForm: boolean,
  montoPagar: number
}

function PagoEnLinea(props: Props) {
  const {
    partidas,
    cards,
    handleChange,
    form,
    disabledOpenPayForm,
    onPay,
    montoPagar,
    removePartida
  } = props

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
  const listaPartidas = partidas.map(partida => (
    <Row className="mb-3" key={partida.numeroboleta}>
      <Col xs={8}>
        <p className={`${style.numeroboleta} my-0`}>{partida.id}</p>
        <p className={`${style.operacion} my-0`}>{partida.tipoOperacion}</p>
        <p className={`${style.eliminar} my-0 py-0`}>
          <a
            className={`${style.eliminar} `}
            onClick={() => removePartida(partida.id)}
          >
            Eliminar
          </a>
        </p>
      </Col>
      <Col xs={4} className={`${style.monto} text-right my-auto  pr-3 `}>
        <p>{formatter.format(partida.monto)}</p>
      </Col>
    </Row>
  ))

  const divPartidas = (
    <div>
      <Row>
        <Col xs={9}>
          <p className={style.detalledepago}>Detalle pago</p>
        </Col>
        <Col xs={3} className="text-right">
          <a href="#">Editar</a>
        </Col>
      </Row>
      {listaPartidas}
      <Row className={`${style.pago} border-top mx-0 pt-2`}>
        <Col xs={6} className="pl-0">
          <p>Pago</p>
        </Col>
        <Col xs={6} className="text-right pr-0">
          <p>{formatter.format(montoPagar)}</p>
        </Col>
      </Row>
      <OpenPayInfo styles={style} />
    </div>
  )

  const noPartidas = (
    <div>
      <Row>
        <Col xs={12} className="text-center mb-5">
          <img
            src={noBoletas}
            className="img-fluid d-block mx-auto mt-3"
            alt="icono-tarjetas"
          />
          <p className={`${style.aunboleta} text-center mt-4`}>
            Aún no agregas boletas para pagar
          </p>
          <p className={`${style.consultaSeccion} text-center mt-1`}>
            Consulta la sección de boletas para agregar boletas a tu lista de
            pagos
          </p>
          <Button label="Seleccionar boletas" />
        </Col>
      </Row>
    </div>
  )

  const cardsCheck = cards.map(card => (
    <Col xs={4} key={card.referencia}>
      <Row>
        <Col xs={1} className="my-2 px-0">
          <Checkbox
            type="radio"
            id={card.referencia}
            name="cardSelected"
            onChange={handleChange}
            dataType={card.referencia}
            value={form.cardSelected}
          />
        </Col>
        <Col xs={11} className="mx-0 pl-2 pr-0">
          <img
            src={card.tipo.toLowerCase() === 'visa' ? logoVisa : logoMasterCard}
            alt=""
            className={style.imageTypeCard}
          />
          <p className={`${style.alias} text-capitalize my-0`}>{card.alias}</p>
          <p className={style.cardNumber}>
            **** **** ****&nbsp;
            {card.digitos}
          </p>
        </Col>
      </Row>
    </Col>
  ))

  const payMethods = (
    <div>
      <Row className="border-bottom mb-0">
        <Col xs={12}>
          <p className={`${style.seleccionaMetodo} mb-1`}>
            Selecciona tu método de pago
          </p>
        </Col>
      </Row>
      <Row className="w-100 my-2 mx-0 px-0 border-bottom ">{cardsCheck}</Row>
      <Row>
        <Col>
          <Checkbox
            type="radio"
            id="otro"
            name="cardSelected"
            onChange={handleChange}
            dataType="otro"
            label="Otro"
            classLabel={style.otro}
            value={form.cardSelected}
          />
        </Col>
      </Row>
    </div>
  )
  const showAlias = disabledOpenPayForm || cards.length >= 3

  return (
    <Fragment>
      <Row className="tickets-next-to-beat-message border-bottom pb-2 pt-1 mx-0">
        <Col md={10}>
          <h4>
            <small>Pago en línea</small>
          </h4>
        </Col>
      </Row>
      <Row>
        <Col md={4} className="backgroundLigthGray ml-3 pt-4 px-4">
          {partidas.length === 0 ? noPartidas : divPartidas}
        </Col>
        <Col md={{ xs: 7, offset: 1 }} className="pt-4">
          {cards.length === 0 ? (
            <p className={`${style.seleccionaMetodo} mb-1`}>
              Pagar con tarjeta
            </p>
          ) : (
            payMethods
          )}
          <Row>
            <Col xs={12}>
              <p className={`${style.creditoDebito} mb-1 mt-2`}>
                CRÉDITO Y DÉBITO
              </p>
              <fieldset disabled={disabledOpenPayForm}>
                <OpenPayForm form={form} styles={style} />
              </fieldset>
            </Col>
          </Row>
          <Row>
            <Col xs={4} className="pr-0 pl-3 mx-0">
              <Collapse in={!showAlias}>
                <div className="mt-4 pt-3">
                  <Checkbox
                    name="remember"
                    id="remember"
                    type="checkbox"
                    value={form.remember}
                    label="Recordar método de pago"
                    classLabel={`${style.labelRemember} pt-1`}
                    onChange={handleChange}
                  />
                </div>
              </Collapse>
              {cards.length === 3 ? (
                <div>
                  <p className={`${style.alcanzaste} mt-2 mb-1`}>
                    Alcanzaste la cantidad máxima de métodos registrados
                  </p>
                  <a
                    href="/mimonte/registro-tarjetas"
                    className={`${style.gestionarMetodo} mt-0 mb-4 pb-1`}
                  >
                    Gestionar métodos de pago
                  </a>
                </div>
              ) : (
                <span />
              )}
            </Col>
            <Col xs={8} className="pl-2">
              <Row className="mx-0 px-0">
                <Collapse in={!showAlias && form.remember} className="w-100">
                  <Col xs={12} className="px-0">
                    <TextInput
                      label="Alias"
                      name="alias"
                      id="alias"
                      value={form.alias}
                      onChange={handleChange}
                    />
                  </Col>
                </Collapse>
              </Row>
              <Row className="mx-0 my-4 pb-1">
                <Col xs={6} />
                <Col xs={6} className="my-auto px-0">
                  <Button label="Pagar" className="w-100" onClick={onPay} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs={1} />
      </Row>
    </Fragment>
  )
}

export default PagoEnLinea
