import { useContext } from 'react'
import { DevFlowContext } from './DevFlowProvider' // Adjust the import path

export const useDevFlow = () => {
  const context = useContext(DevFlowContext)

  if (!context) {
    throw new Error('useDevFlow must be used within a DevFlowProvider')
  }

  return context
}
