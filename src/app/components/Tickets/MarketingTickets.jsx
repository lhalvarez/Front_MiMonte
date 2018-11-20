import React from 'react'
import { Row, Col } from 'react-bootstrap'

import DataTable from 'Components/commons/DataTable'
import iconoAnillo from 'SharedImages/ico-anillo-etiqueta-120.png'
import iconoBoleta from 'SharedImages/ico-hoja-id-80.png'
import iconoMessages from 'SharedImages/ico-globos-80.png'
import Styles from './Tickets.less'

type Props = {
  columns: Array<Object>,
  data: Array<Object>
}

function ActiveTickets(props: Props) {
  const { columns, data } = props

  return (
    <Row>
      <Col md={9}>
        <DataTable
          columns={columns}
          data={data}
          noDataIndication="No cuentas con boletas en comercialización"
          search
          pagination
        />
      </Col>
      <Col md={3} className="mt-4">
        <img
          src={iconoAnillo}
          className="img-fluid d-block mx-auto"
          alt="icono-anillo"
        />
        <h3 className={`mt-3 ${Styles.h3}`}>
          ¡Aún puedes recuperar tu prenda!
          <br />
          <small className={Styles.small}>
            Acude a la sucursal de Nacional Monte de Piedad en donde realizaste
            tu empeño y realiza tu Desempeño Extemporáneo.
          </small>
        </h3>
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
