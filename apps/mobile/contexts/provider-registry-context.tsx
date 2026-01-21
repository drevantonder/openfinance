import React, { createContext, useContext } from 'react';

import { ProviderRegistry } from '@openfinance/core';

const ProviderRegistryContext = createContext<ProviderRegistry | undefined>(undefined);

export function ProviderRegistryProvider({ children }: { children: React.ReactNode }) {
  const providerRegistry = new ProviderRegistry();

  return (
    <ProviderRegistryContext.Provider value={providerRegistry}>
      {children}
    </ProviderRegistryContext.Provider>
  );
}

export function useProviderRegistry() {
  const context = useContext(ProviderRegistryContext);
  if (context === undefined) {
    throw new Error('useProviderRegistry must be used within a ProviderRegistryProvider');
  }
  return context;
}
