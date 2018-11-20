import React from 'react'

import { formatDate } from 'SharedUtils/Utils'

import { Card } from 'react-bootstrap'
import Styles from './Home.less'

type Props = {
  ticketNumber: string,
  description: string,
  type: string,
  date: string,
  handleClickDetail: void
}

function TicketCard(props: Props) {
  const { ticketNumber, description, type, date, handleClickDetail } = props

  return (
    <Card className={Styles.ticket_card}>
      <Card.Body>
        <Card.Title>Nº de boleta</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {ticketNumber}
        </Card.Subtitle>
        <Card.Text>
          <div className="text-description">
            <p>
              {description}
              <br />
              <small>
                Tipo de empeño:
                {type}
              </small>
            </p>
          </div>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Card.Text>
          <p>
            <small>Fecha de vencimiento</small>
            <br />
            {formatDate(date, 'MMM Do YY')}
          </p>
        </Card.Text>
        <Card.Link className="btn-details" href="#" onClick={handleClickDetail}>
          Detalles
        </Card.Link>
      </Card.Footer>
    </Card>
  )
}

export default TicketCard
