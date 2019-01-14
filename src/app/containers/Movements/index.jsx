import React, { Component } from 'react'

import * as Utils from 'SharedUtils/Utils'

import MovementsTable from 'Components/Movements'
import getMovements, { downloadTicketMovements } from 'Api/Movements'
import { UserConsumer } from 'Context/User'

// Style
import style from 'Components/Movements/Movements.less'

type Props = {
  onShowModal: Object
}

type State = {
  columns: Array<mixed>
}

class Movements extends Component<Props, State> {
  static contextType = UserConsumer

  state = {
    data: [],
    columns: [
      {
        dataField: 'folio',
        text: 'Nº boleta',
        simpleCustomClass: 'boleta text-center'
      },
      {
        dataField: 'monto',
        text: 'Monto',
        type: 'currency',
        classes: 'align-items-center'
      },
      {
        dataField: 'operacion',
        text: 'Operacion',
        classes: 'align-items-center'
      },
      {
        dataField: 'estatus',
        text: 'Estatus',
        classes: 'align-items-center'
      },
      {
        dataField: 'fecha',
        text: 'Fecha',
        type: 'date',
        classes: 'text-lowercase align-middle'
      },
      {
        dataField: 'autorizacion',
        text: 'N° autorizacion bancaria',
        classes: ''
      },
      {
        dataField: 'transaccion',
        text: 'N° transacción',
        classes: ''
      },
      {
        dataField: 'imprimir',
        text: '',
        type: 'custom',
        customObject: [
          {
            name: 'Imprimir',
            icon: '',
            class: ''
          }
        ],
        customDivClass: ''
      }
    ]
  }

  componentWillMount() {
    const { userInfo } = this.context
    getMovements({
      cliente: {
        idCliente: userInfo.clientId
      },
      transaccion: {
        estados: {
          estado: ['EN_PROCESO_DE_PAGO']
        },
        fechaConsulta: {
          fechaInicio: '2007-10-26',
          fechaFin: Utils.formatDate(Utils.getToday())
        },
        operaciones: {
          operacion: [1]
        }
      }
    }).then(data => {
      this.setState({ data })
    })
  }

  onClickDocument = row => {
    const { onShowModal } = this.props

    downloadTicketMovements({
      partidas: {
        partida: [
          {
            prenda: {
              folio: row.folio
            }
          }
        ]
      }
    })
      .then(response => {
        const blob = new Blob([response], { type: 'application/pdf' })
        const objectUrl = URL.createObjectURL(blob)

        window.open(objectUrl)
      })
      .catch(() => {
        onShowModal(Utils.errorMessage('', 'Falló descarga de archivo'))
      })
  }

  render() {
    const { columns, data } = this.state
    return (
      <div className="border-box-shadow mt-1 pt-2 py-0 px-0">
        <MovementsTable
          columns={columns}
          data={data}
          customHandlers={[e => this.onClickDocument(e)]}
          style={style}
        />
      </div>
    )
  }
}

export default Movements
