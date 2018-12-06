/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import { InputGroup } from 'react-bootstrap'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import paginationFactory from 'react-bootstrap-table2-paginator'
import overlayFactory from 'react-bootstrap-table2-overlay'
import numeral from 'numeral'
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
  pagination: boolean,
  loading: boolean
}

function DataTable(props: Props) {
  const {
    data,
    columns,
    noDataIndication,
    customHandlers,
    search,
    pagination,
    loading
  } = props

  const { SearchBar } = Search

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Mostrando {from} de {to} de {size} Resultados
    </span>
  )

  const options = {
    alwaysShowAllBtns: true,
    withFirstAndLast: false,
    hideSizePerPage: true,
    firstPageText: '<<',
    prePageText: '<',
    nextPageText: '>',
    lastPageText: '>>',
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
    const { type, customObject, customDivClass, simpleCustomClass } = option

    if (type === 'date') {
      return <span>{formatDate(cell, 'LL')}</span>
      // eslint-disable-next-line no-else-return
    } else if (type === 'currency') {
      return <span>{numeral(cell).format('$ 0,0.00')}</span>
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
            &nbsp;
          </span>
        )
      })
      return <div className={customDivClass}>{customOptions}</div>
    }

    return <span className={simpleCustomClass}>{cell}</span>
  }

  columns.map(e => {
    e.formatter = (cell, row) => formatterCell(cell, row, e)
    return e
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
            pagination={pagination ? paginationFactory(options) : null}
            {...props.baseProps}
            loading={loading}
            overlay={overlayFactory({
              spinner: true,
              background: 'rgba(153, 40, 59, 1)'
            })}
          />
        </Fragment>
      )}
    </ToolkitProvider>
  )
}

export default DataTable
