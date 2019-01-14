/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'

import { getCurrency } from 'SharedUtils/Utils'

import noBoletas from 'SharedImages/icon-mas-boletas.svg'
import Button from 'Components/commons/Button'
import style from './Tickets.less'

type Props = {
  data: Array<mixed>,
  handleDetelete: void,
  handlePay: void
}

function PayPanel(props: Props) {
  const { data, handleDetelete, handlePay } = props

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  const mapOptions = (item, index) => (
    <Row className="mb-3" key={index.toString()}>
      <Col xs={8}>
        <p className={`${style.numeroboleta} my-0`}>{item.id}</p>
        <p className={`${style.operacion} my-0`}>
          {`${
            item.tipoEmpeno === 'desempeno'
              ? 'Desempeño'
              : item.tipoEmpeno === 'refrendo'
              ? 'Refrendo'
              : 'Abono'
          }`}
        </p>
        <p className={`${style.eliminar} my-0 py-0`}>
          <a
            className={`${style.eliminar} `}
            onClick={e => {
              e.preventDefault()
              handleDetelete(item.id)
            }}
          >
            Eliminar
          </a>
        </p>
      </Col>
      <Col xs={4} className={`${style.monto} text-right my-auto  pr-3 `}>
        <p>{formatter.format(item.monto)}</p>
      </Col>
    </Row>
  )

  const getSum = () => data.reduce((a, b) => +a + +b.monto, 0)

  return (
    <Fragment>
      <div>
        <fieldset>
          <legend>Detalle de pago</legend>
          <div className="panel-pay">
            {!data.length && (
              <Fragment>
                <img
                  src={noBoletas}
                  className="img-fluid d-block mx-auto mt-4"
                  alt="no-noletas"
                />
                <h5>No tienes boletas para pagar</h5>
                <p className="advice">
                  Selecciona los movimientos que quieres realizar en la lista de
                  la izquierda
                </p>
              </Fragment>
            )}
            {data.length > 0 && data.map((d, index) => mapOptions(d, index))}
            <div className="total-pay">
              <p>
                Pago
                <small>{getCurrency(getSum())}</small>
              </p>
            </div>
          </div>
          <Button
            name="Pagar"
            label="Pagar"
            disabled={!data.length}
            block
            onClick={handlePay}
          />
        </fieldset>
      </div>
    </Fragment>
  )
}

export default PayPanel
