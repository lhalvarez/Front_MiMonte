import React, { Fragment } from 'react'

import DataTable from 'Components/commons/DataTable'

type Props = {
  columns: Array<Object>,
  data: Array<Object>,
  customHandlers: Array<mixed>
}

function ActiveTickets(props: Props) {
  const { columns, data, customHandlers } = props

  return (
    <Fragment>
      <DataTable
        columns={columns}
        data={data}
        noDataIndication="No cuentas con boletas activas"
        customHandlers={customHandlers}
        search
        pagination
      />
    </Fragment>
  )
}

export default ActiveTickets
