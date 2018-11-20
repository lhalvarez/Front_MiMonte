/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-param-reassign */
import React, { Fragment } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import { InputGroup } from 'react-bootstrap'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons'

import { formatDate } from 'SharedUtils/Utils'

library.add(
  faSearch,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight
)

type Props = {
  data: Array<Object>,
  columns: Array<Object>,
  noDataIndication: string,
  customHandlers: Array<mixed>,
  search: boolean,
  pagination: boolean
}

function DataTable(props: Props) {
  const {
    data,
    columns,
    noDataIndication,
    customHandlers,
    search,
    pagination
  } = props

  const { SearchBar } = Search

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Mostrando {from} de {to} de {size} Resultados
    </span>
  )

  const options = {
    paginationSize: 5,
    pageStartIndex: 0,
    alwaysShowAllBtns: true,
    withFirstAndLast: false,
    hideSizePerPage: true,
    firstPageText: <FontAwesomeIcon icon={faAngleDoubleLeft} />,
    prePageText: <FontAwesomeIcon icon={faAngleLeft} />,
    nextPageText: <FontAwesomeIcon icon={faAngleRight} />,
    lastPageText: <FontAwesomeIcon icon={faAngleDoubleRight} />,
    showTotal: true,
    paginationTotalRenderer: customTotal,
    sizePerPageList: [
      {
        text: '5',
        value: 5
      }
    ]
  }

  function formatterCell(cell, row, option) {
    const { type, customObject, customDivClass } = option

    if (type === 'date') {
      return <span>{formatDate(cell, 'LL')}</span>
      // eslint-disable-next-line no-else-return
    } else if (type === 'custom') {
      const customOptions = []
      customObject.forEach((c, index) => {
        const handlerClick = customHandlers[index]

        customOptions.push(
          // eslint-disable-next-line react/no-array-index-key
          <span key={index} className={c.class}>
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                handlerClick(row.id ? row.id : row)
              }}
            >
              {c.icon}
              &nbsp;
              {c.name}
            </a>
          </span>
        )
      })
      return <div className={customDivClass}>{customOptions}</div>
    }

    return <span>{cell}</span>
  }

  columns.map(option => {
    option.formatter = (cell, row) => formatterCell(cell, row, option)
    return option
  })

  return (
    <ToolkitProvider
      keyField="id"
      data={data}
      columns={columns}
      bootstrap4
      search
    >
      {props => (
        <Fragment>
          {search && (
            <InputGroup className="search-bar-container">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <SearchBar
                {...props.searchProps}
                className="search-bar"
                placeholder="Buscar"
              />
            </InputGroup>
          )}
          <BootstrapTable
            bordered={false}
            noDataIndication={noDataIndication}
            headerClasses="header-tabla-mimonte"
            pagination={pagination ? paginationFactory(options) : false}
            {...props.baseProps}
          />
        </Fragment>
      )}
    </ToolkitProvider>
  )
}

export default DataTable
