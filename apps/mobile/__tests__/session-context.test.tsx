import React from 'react';
import { Text, Pressable } from 'react-native';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react-native';

import { SessionProvider, useSession } from '@/contexts/session-context';
import { ProviderRegistryProvider } from '@/contexts/provider-registry-context';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

describe('SessionProvider', () => {
  it('should provide session context', async () => {
    const TestComponent = () => {
      const { session, isLoading } = useSession();
      return <>{isLoading ? <Text>Loading</Text> : <Text>No Session</Text>}</>;
    };

    render(
      <ProviderRegistryProvider>
        <SessionProvider>
          <TestComponent />
        </SessionProvider>
      </ProviderRegistryProvider>
    );

    expect(screen.getByText('Loading')).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText('No Session')).toBeTruthy();
    });
  });

  it('should allow setting session', async () => {
    const TestComponent = () => {
      const { session, isLoading, setSession } = useSession();
      return (
        <>
          {isLoading ? <Text>Loading</Text> : <Text testID="session-text">{session ? 'Has Session' : 'No Session'}</Text>}
          <Pressable testID="set-session" onPress={() => setSession({ userId: 'test', accessToken: 'token', expiresAt: 123 })} />
        </>
      );
    };

    render(
      <ProviderRegistryProvider>
        <SessionProvider>
          <TestComponent />
        </SessionProvider>
      </ProviderRegistryProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('session-text')).toHaveTextContent('No Session');
    });

    act(() => {
      fireEvent.press(screen.getByTestId('set-session'));
    });

    expect(screen.getByTestId('session-text')).toHaveTextContent('Has Session');
  });

  it('should allow clearing session', async () => {
    const TestComponent = () => {
      const { session, isLoading, setSession } = useSession();
      return (
        <>
          {isLoading ? <Text>Loading</Text> : <Text testID="session-text">{session ? 'Has Session' : 'No Session'}</Text>}
          <Pressable testID="set-session" onPress={() => setSession({ userId: 'test', accessToken: 'token', expiresAt: 123 })} />
          <Pressable testID="clear-session" onPress={() => setSession(null)} />
        </>
      );
    };

    render(
      <ProviderRegistryProvider>
        <SessionProvider>
          <TestComponent />
        </SessionProvider>
      </ProviderRegistryProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('session-text')).toHaveTextContent('No Session');
    });

    act(() => {
      fireEvent.press(screen.getByTestId('set-session'));
    });

    expect(screen.getByTestId('session-text')).toHaveTextContent('Has Session');

    act(() => {
      fireEvent.press(screen.getByTestId('clear-session'));
    });

    expect(screen.getByTestId('session-text')).toHaveTextContent('No Session');
  });

  it('should handle unmount during session load', async () => {
    const TestComponent = () => {
      const { isLoading } = useSession();
      return <>{isLoading ? <Text>Loading</Text> : <Text>Loaded</Text>}</>;
    };

    const { unmount } = render(
      <ProviderRegistryProvider>
        <SessionProvider>
          <TestComponent />
        </SessionProvider>
      </ProviderRegistryProvider>
    );

    expect(screen.getByText('Loading')).toBeTruthy();

    unmount();
  });

  it('should throw error when useSession is used outside SessionProvider', () => {
    const TestComponent = () => {
      useSession();
      return <Text>Test</Text>;
    };

    expect(() => render(<TestComponent />)).toThrow('useSession must be used within a SessionProvider');
  });
});
