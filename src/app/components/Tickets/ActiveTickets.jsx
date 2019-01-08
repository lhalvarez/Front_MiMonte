// Dependencies
import React, { Fragment } from 'react'
// Components
import DataTable from 'Components/commons/DataTable'
// Flow Props and Stats
type Props = {
  columns: Array<Object>,
  data: Array<Object>,
  customHandlers: Array<mixed>,
  loading: boolean,
  handleBlur: void,
  handleRadio: void
}

function ActiveTickets(props: Props) {
  const {
    columns,
    data,
    customHandlers,
    loading,
    handleBlur,
    handleRadio
  } = props

  return (
    <Fragment>
      <DataTable
        columns={columns}
        data={data}
        noDataIndication="No cuentas con boletas activas"
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

export default ActiveTickets
