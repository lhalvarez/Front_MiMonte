/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react'

import { getCurrency } from 'SharedUtils/Utils'

import noBoletas from 'SharedImages/icon-mas-boletas.svg'
import Button from 'Components/commons/Button'

type Props = {
  data: Array<mixed>,
  handleDetelete: void,
  handlePay: void
}

function PayPanel(props: Props) {
  const { data, handleDetelete, handlePay } = props

  const mapOptions = (item, index) => (
    <div key={index.toString()}>
      <p>
        {item.id}
        <br />
        <small>
          {`${
            item.tipoEmpeno === 'desempeno'
              ? 'Desempeño'
              : item.tipoEmpeno === 'refrendo'
              ? 'Refrendo'
              : 'Abono'
          } ${getCurrency(item.monto)}`}
        </small>
      </p>
      <a
        href="#"
        onClick={e => {
          e.preventDefault()
          handleDetelete(item.id)
        }}
      >
        Eliminar
      </a>
    </div>
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
