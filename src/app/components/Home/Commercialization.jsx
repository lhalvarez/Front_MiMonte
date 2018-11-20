import React from 'react'
import DataTable from 'Components/commons/DataTable'

type Props = {
  columns: Array<Object>,
  data: Array<Object>,
  customHandlers: Array<mixed>
}

function Commercialization(props: Props) {
  const { columns, data, customHandlers } = props

  return (
    <DataTable
      columns={columns}
      data={data}
      noDataIndication="No cuentas con boletas en comercialización"
      customHandlers={customHandlers}
    />
  )
}

export default Commercialization
