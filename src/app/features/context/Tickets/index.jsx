// Dependencies
import { createContext } from 'react'

const TicketsContext = createContext({
  tickets: () => Array,
  ticketConditions: () => Array,
  ticketDetail: () => Array,
  ticketOperations: () => Array
})

export default TicketsContext
