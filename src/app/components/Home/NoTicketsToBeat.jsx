import React from 'react'
import { Card } from 'react-bootstrap'

import Button from 'Components/commons/Button'

type Props = {
  handleClickDetail: void
}

function NoTicketsToBeat(props: Props) {
  const { handleClickDetail } = props

  return (
    <Card className="ticket-card">
      <Card.Body>
        <Card.Title>
          <h3>No tienes boletas con vencimiento próximo</h3>
        </Card.Title>
        <Button
          variant="default"
          label="Ver todas las boletas"
          className="d-block mx-auto"
          size="sm"
          onClick={handleClickDetail}
        />
      </Card.Body>
      <Card.Footer />
    </Card>
  )
}

export default NoTicketsToBeat
