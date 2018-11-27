// Dependencies
import { createContext } from 'react'

export const LoginContext = createContext({
  userInfo: () => Object
})
const LoginProvider = LoginContext.Provider
const LoginConsumer = LoginContext.Consumer

export { LoginProvider, LoginConsumer }
