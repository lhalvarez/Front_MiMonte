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
      <Card.Body className={Styles.card_body}>
        <Card.Title className={Styles.card_title}>Nº de boleta</Card.Title>
        <Card.Subtitle className={`${Styles.card_subtitle} mb-2 text-muted`}>
          {ticketNumber}
        </Card.Subtitle>
        <Card.Text className={Styles.text_description}>
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
      <Card.Footer className={Styles.card_footer}>
        <Card.Text className={Styles.card_footer_text}>
          <p className={Styles.card_footer_text_p}>
            <small className={Styles.card_footer_text_p_small}>
              Fecha de vencimiento
            </small>
            <br />
            {formatDate(date, 'MMM Do YY')}
          </p>
        </Card.Text>
        <Card.Link
          className={`${Styles.card_footer_a} btn-details`}
          href="#"
          onClick={handleClickDetail}
        >
          {' '}
          Detalles
        </Card.Link>
      </Card.Footer>
    </Card>
  )
}

export default TicketCard
