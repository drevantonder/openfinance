import { renderHook } from '@testing-library/react-native';
import { ProviderRegistryProvider, useProviderRegistry } from '../contexts/provider-registry-context';

describe('ProviderRegistryProvider', () => {
  it('should provide provider registry', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProviderRegistryProvider>{children}</ProviderRegistryProvider>
    );

    const { result } = renderHook(() => useProviderRegistry(), { wrapper });

    expect(result.current).toBeDefined();
    expect(typeof result.current.getAuthProvider).toBe('function');
    expect(typeof result.current.getUserProfileProvider).toBe('function');
    expect(typeof result.current.getModuleVariablesProvider).toBe('function');
  });

  it('should get module variables provider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProviderRegistryProvider>{children}</ProviderRegistryProvider>
    );

    const { result } = renderHook(() => useProviderRegistry(), { wrapper });

    const provider = result.current.getModuleVariablesProvider('test-module');
    expect(provider).toBeDefined();
  });

  it('should throw error when useProviderRegistry is used outside ProviderRegistryProvider', () => {
    expect(() => renderHook(() => useProviderRegistry())).toThrow('useProviderRegistry must be used within a ProviderRegistryProvider');
  });
});
