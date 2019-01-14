// Dependencies
import React, { Fragment } from 'react'
// Components
import DataTable from 'Components/commons/DataTable'
import { replaceObject } from 'SharedUtils/Utils'
// Flow Props and Stats
type Props = {
  columns: Array<Object>,
  data: Array<Object>,
  customHandlers: Array<mixed>,
  loading: boolean,
  handleBlur: void,
  handleRadio: void
}

function TicketsToBeat(props: Props) {
  const { data, customHandlers, loading, handleBlur, handleRadio } = props
  let { columns } = props

  const columnsObj = {
    dataField: 'condiciones.fechaLimitePago',
    text: 'Fecha límite de pago',
    type: 'dateWarning',
    classes: 'date-warning'
  }
  columns = replaceObject(
    columns,
    { dataField: 'condiciones.fechaLimitePago' },
    columnsObj
  )

  return (
    <Fragment>
      <DataTable
        columns={columns}
        data={data}
        noDataIndication="No cuentas con boletas próximas a vencer"
        customHandlers={customHandlers}
        search
        pagination
        loading={loading}
        handleBlur={handleBlur}
        handleRadio={handleRadio}
      />
    </Fragment>
  )
}

export default TicketsToBeat
