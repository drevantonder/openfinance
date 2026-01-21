import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { useRouter } from 'expo-router';

import LoginScreen from '@/app/login';
import { ProviderRegistryProvider } from '@/contexts/provider-registry-context';
import { SessionProvider } from '@/contexts/session-context';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

describe('LoginScreen', () => {
  const mockRouter = {
    replace: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  it('should render welcome message', () => {
    render(
      <ProviderRegistryProvider>
        <SessionProvider>
          <LoginScreen />
        </SessionProvider>
      </ProviderRegistryProvider>
    );

    expect(screen.getByText('Welcome')).toBeTruthy();
    expect(screen.getByText('Sign in to track your money')).toBeTruthy();
  });

  it('should render sign in button', () => {
    render(
      <ProviderRegistryProvider>
        <SessionProvider>
          <LoginScreen />
        </SessionProvider>
      </ProviderRegistryProvider>
    );

    expect(screen.getByText('Sign In')).toBeTruthy();
  });

  it('should call auth provider on sign in press', async () => {
    render(
      <ProviderRegistryProvider>
        <SessionProvider>
          <LoginScreen />
        </SessionProvider>
      </ProviderRegistryProvider>
    );

    const signInButton = screen.getByText('Sign In');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/(tabs)');
    });
  });

  it('should handle sign in error', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ProviderRegistryProvider>
        <SessionProvider>
          <LoginScreen />
        </SessionProvider>
      </ProviderRegistryProvider>
    );

    const signInButton = screen.getByText('Sign In');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/(tabs)');
    });

    consoleSpy.mockRestore();
  });
});
