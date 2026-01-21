import React, { createContext, useContext, useState, useEffect } from 'react';

import type { Session } from '@openfinance/core';
import { useProviderRegistry } from './provider-registry-context';

type SessionContextType = {
  session: Session | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

function SessionProviderInner({ children }: { children: React.ReactNode }) {
  const [session, setSessionState] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const providerRegistry = useProviderRegistry();

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const authProvider = providerRegistry.getAuthProvider();
        const existingSession = await authProvider.getSession();
        if (mounted) {
          setSessionState(existingSession);
        }
      } catch (error) {
        console.error('Failed to load session:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadSession();

    return () => {
      mounted = false;
    };
  }, [providerRegistry]);

  const setSession = (newSession: Session | null) => {
    setSessionState(newSession);
  };

  return (
    <SessionContext.Provider value={{ session, isLoading, setSession }}>{children}</SessionContext.Provider>
  );
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <SessionProviderInner>{children}</SessionProviderInner>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
