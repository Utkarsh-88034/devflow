import { ReactNode } from 'react'
import React from 'react'

import { DevFlow } from './DevFlow' // Import your DevFlow class

export const DevFlowContext = React.createContext<DevFlow | undefined>(
  undefined
)

export const DevFlowProvider: React.FC<{
  apiKey: string
  children: ReactNode
}> = ({ apiKey, children }) => {
  const sdk = DevFlow.initialize(apiKey)
  const contextValue = {
    sdk,
    captureGeneralError: sdk.captureGeneralError,
    captureAJAXError: sdk.captureAJAXError,
    captureUIInterfaceError: sdk.captureUIInterfaceError,
    captureFromInputError: sdk.captureFromInputError,
    apiKey: sdk.apiKey
    // Add more methods here
  }
  return (
    <DevFlowContext.Provider value={contextValue}>
      {children}
    </DevFlowContext.Provider>
  )
}
