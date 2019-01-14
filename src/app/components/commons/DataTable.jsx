/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import { InputGroup, Row, Col } from 'react-bootstrap'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import paginationFactory from 'react-bootstrap-table2-paginator'
import overlayFactory from 'react-bootstrap-table2-overlay'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faExclamationCircle,
  faHourglassHalf,
  faCircle
} from '@fortawesome/free-solid-svg-icons'

import Checkbox from 'Components/commons/Checkbox'
import TextInput from 'Components/commons/TextInput'

import { formatDate, getItem, getCurrency } from 'SharedUtils/Utils'

library.add(
  faSearch,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faExclamationCircle,
  faHourglassHalf,
  faCircle
)

type Props = {
  data: Array<Object>,
  columns: Array<Object>,
  noDataIndication: string,
  customHandlers: Array<mixed>,
  search: boolean,
  pagination: boolean,
  loading: boolean,
  handleChange: void,
  handleRadio: void,
  textHeader: Object,
  handleBlur: void
}

function DataTable(props: Props) {
  const {
    data,
    columns,
    noDataIndication,
    customHandlers,
    search,
    pagination,
    loading,
    handleRadio,
    handleBlur,
    textHeader
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
      return <span>{formatDate(cell, ' DD MMMM YYYY')}</span>
      // eslint-disable-next-line no-else-return
    } else if (type === 'currency') {
      return <span>{getCurrency(cell)}</span>
    } else if (type === 'custom') {
      const customOptions = []
      customObject.forEach((c, index) => {
        const handlerClick = customHandlers[index]
        customOptions.push(
          // eslint-disable-next-line react/no-array-index-key
          <span key={index} className={c.class}>
            {c.icon}
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                handlerClick(row.id ? row.id : row)
              }}
            >
              {c.name}
            </a>
          </span>
        )
      })
      return <div className={customDivClass}>{customOptions}</div>
    } else if (type === 'trafficLight') {
      const { condiciones } = row

      return (
        <p>
          {condiciones && condiciones.tipoSemaforo === 'Rojo' && (
            <Fragment>
              <small>Próxima a vencer</small>
              <br />
            </Fragment>
          )}
          {condiciones && condiciones.tipoSemaforo && (
            <Fragment>
              <FontAwesomeIcon
                className={
                  condiciones.tipoSemaforo === 'Rojo'
                    ? 'red-light'
                    : condiciones.tipoSemaforo === 'Ambar'
                    ? 'ambar-light'
                    : 'verde-light'
                }
                icon={
                  condiciones.tipoSemaforo === 'Rojo'
                    ? faExclamationCircle
                    : faCircle
                }
              />
              &nbsp;
            </Fragment>
          )}
          {formatDate(cell, ' DD MMMM YYYY')}
        </p>
      )
    } else if (type === 'saldos') {
      const { operacionDisponible } = row.operacionesDisponibles
      const operacionAbono = getItem(operacionDisponible, { idOperacion: 116 })
      const {
        id,
        radioDesempeno,
        radioRefrendo,
        radioAbono,
        abono,
        saldos
      } = row

      const SaldosItem = () => (
        <Fragment>
          {saldos && (
            <Fragment>
              <div
                className={`radio ${radioDesempeno ? 'active' : ''} ${
                  saldos.saldoDesempeno === 0 ? 'disabled' : ''
                }`}
              >
                <div className="radio-container">
                  <Checkbox
                    label="Desempeño"
                    name={`partida${id}`}
                    id={`desempeno&${id}`}
                    value={id}
                    type="radio"
                    checked={radioDesempeno}
                    onChange={handleRadio}
                  />
                </div>
                <span>
                  {saldos && saldos.saldoDesempeno
                    ? getCurrency(saldos.saldoDesempeno)
                    : ''}
                </span>
              </div>
              <div
                className={`radio ${radioRefrendo ? 'active' : ''} ${
                  saldos.saldoRefrendo === 0 ? 'disabled' : ''
                }`}
              >
                <div className="radio-container">
                  <Checkbox
                    label="Refrendo"
                    name={`partida${id}`}
                    id={`refrendo&${id}`}
                    value={id}
                    type="radio"
                    checked={radioRefrendo}
                    onChange={handleRadio}
                  />
                </div>
                {saldos && saldos.saldoRefrendo
                  ? getCurrency(saldos.saldoRefrendo)
                  : ''}
              </div>
            </Fragment>
          )}
          {!saldos && (
            <p>
              Cargando saldos...&nbsp;
              <FontAwesomeIcon icon={faHourglassHalf} />
            </p>
          )}
          {saldos && operacionAbono.aplicable && (
            <div className={`radio ${radioAbono ? 'active' : ''}`}>
              <div className="radio-container">
                <Checkbox
                  label="Abono"
                  name={`partida${id}`}
                  id={`abono&${id}`}
                  value={id}
                  type="radio"
                  checked={radioAbono}
                  onChange={handleRadio}
                />
              </div>
              <TextInput
                name={`abono${id}`}
                id={id}
                placeholder={radioAbono ? getCurrency(abono) : '$ 0.00'}
                label=""
                type="text"
                decimal
                disabled={!radioAbono}
                handleBlur={handleBlur}
              />
            </div>
          )}
        </Fragment>
      )
      return <SaldosItem />
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
            <Row>
              <Col xs={3}>
                <InputGroup className="search-bar-container">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <SearchBar
                    {...props.searchProps} // eslint-disable-line
                    className="search-bar"
                    placeholder="Buscar"
                  />
                </InputGroup>
              </Col>
              <Col xs={9}>{textHeader}</Col>
            </Row>
          )}
          <BootstrapTable
            bordered={false}
            noDataIndication={noDataIndication}
            headerClasses="header-tabla-mimonte"
            pagination={pagination ? paginationFactory(options) : null}
            wrapperClasses="table-responsive"
            {...props.baseProps} // eslint-disable-line
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
