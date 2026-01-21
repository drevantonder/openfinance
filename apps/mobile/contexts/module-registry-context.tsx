import React, { createContext, useContext } from 'react'

import { moduleRegistry } from '@/config/modules'
import type { ModuleRegistry } from '@openfinance/core'

const ModuleRegistryContext = createContext<ModuleRegistry>(moduleRegistry)

export function ModuleRegistryProvider({ children }: { children: React.ReactNode }) {
  return (
    <ModuleRegistryContext.Provider value={moduleRegistry}>
      {children}
    </ModuleRegistryContext.Provider>
  )
}

export function useModuleRegistry(): ModuleRegistry {
  return useContext(ModuleRegistryContext)
}
