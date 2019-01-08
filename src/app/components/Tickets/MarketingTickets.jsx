// Dependencies
import React from 'react'
import { Row, Col } from 'react-bootstrap'
// Components
import DataTable from 'Components/commons/DataTable'
// Images
import iconoAnillo from 'SharedImages/ico-recuperar1.png'
import iconoBoleta from 'SharedImages/ico-recuperar2.png'
import iconoMessages from 'SharedImages/ico-recuperar3.png'
// Styles
import Styles from './Tickets.less'
// Flow Props and Stats
type Props = {
  columns: Array<Object>,
  data: Array<Object>,
  loading: boolean
}

function ActiveTickets(props: Props) {
  const { columns, data, loading } = props

  return (
    <Row>
      <Col xs={12}>
        <DataTable
          columns={columns}
          data={data}
          noDataIndication="No cuentas con boletas en comercialización"
          search
          pagination
          loading={loading}
        />
      </Col>
      <Col xs={12} className="mt-4">
        <h3 className={`mt-3 ${Styles.h3} text-center`}>
          ¡Aún puedes recuperar tu prenda!
        </h3>
      </Col>
      <Col md={4} className="mt-4">
        <img
          src={iconoAnillo}
          className="img-fluid d-block mx-auto mt-4"
          alt="icono-anillo"
        />
        <p className={`mt-2 text-center ${Styles.p}`}>
          Acude a la sucursal de Nacional Monte de Piedad en donde realizaste tu
          empeño y realiza tu Desempeño Extemporáneo.
        </p>
      </Col>
      <Col md={4} className="mt-4">
        <img
          src={iconoBoleta}
          className="img-fluid d-block mx-auto mt-4"
          alt="icono-boleta"
        />
        <p className={`mt-2 text-center ${Styles.p}`}>
          Deberás presentar tu identificación oficial y boleta original, así
          como realizar el pago de tu préstamo otorgado, intereses y comisión
          por desempeño extemporáneo.
        </p>
      </Col>
      <Col md={4} className="mt-4">
        <img
          src={iconoMessages}
          className="img-fluid d-block mx-auto mt-4"
          alt="icono-boleta"
        />
        <p className={`mt-2 text-center ${Styles.p}`}>
          Si tu prenda ya no aparece en el listado es probable que ya se haya
          vendido. Corrobora esta información en la sucursal en donde la
          empeñaste y pide más información en ventanilla.
        </p>
      </Col>
    </Row>
  )
}

export default ActiveTickets
