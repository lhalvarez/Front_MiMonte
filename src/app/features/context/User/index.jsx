// Dependencies
import { createContext } from 'react'

export const UserContext = createContext({
  userInfo: () => Object
})
const UserProvider = UserContext.Provider
const UserConsumer = UserContext.Consumer

export { UserProvider, UserConsumer }
