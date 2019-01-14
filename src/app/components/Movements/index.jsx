// Dependencies
import React, { Fragment } from 'react'
import { Row, Col, Media } from 'react-bootstrap'

// Components
import DataTable from 'Components/commons/DataTable'
import noMovImg from 'SharedImages/ico-no-movimientos.svg'
// Utils
/* import { formatDate, capitalize } from 'SharedUtils/Utils' */

// Flow Props and Stats
type Props = {
  columns: Array<Object>,
  data: Array<Object>,
  customHandlers: Array<mixed>,
  style: Object
}

function MovemenTable(props: Props) {
  const { columns, data, customHandlers, style } = props
  const text = (
    <p className="search-bar-text mt-4 pl-2 pr-4">
      Solo se mostrarán los pagos realizados en el portal Mi Monte.
      <br />
      El comprobante de operación solo estará disponible para reimpresión por 30
      días a partir de la fecha de pago.
    </p>
  )
  return (
    <Fragment>
      <Row className="tickets-next-to-beat-message border-bottom pb-2 pt-1 mx-0">
        <Col md={12}>
          <h4>
            <small>Movimientos</small>
          </h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="ml-4 mr-5 pl-0 pr-5">
          <DataTable
            columns={columns}
            data={data}
            search="true"
            customHandlers={customHandlers}
            textHeader={text}
          />
        </Col>
      </Row>
      {data.length === 0 && (
        <Row>
          <Col xs={{ span: 6, offset: 3 }}>
            <Media className="my-5">
              <img
                className="align-self-center mr-3"
                src={noMovImg}
                alt="No movimientos"
              />
              <Media.Body className="align-self-center ">
                <h4 className={style.title}>
                  Aún no realizas ninguna transacción
                </h4>
                <h5 className={style.texto}>
                  Realiza tus pagos en línea o en una sucursal y el resumen y
                  estatus se mostrará en esta pantalla
                </h5>
              </Media.Body>
            </Media>
          </Col>
        </Row>
      )}
    </Fragment>
  )
}

export default MovemenTable
