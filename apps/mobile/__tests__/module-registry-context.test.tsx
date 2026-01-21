import { renderHook } from '@testing-library/react-native'
import { ModuleRegistryProvider, useModuleRegistry } from '../contexts/module-registry-context'

describe('ModuleRegistryProvider', () => {
  it('should provide module registry', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ModuleRegistryProvider>{children}</ModuleRegistryProvider>
    )

    const { result } = renderHook(() => useModuleRegistry(), { wrapper })

    expect(result.current).toBeDefined()
    expect(typeof result.current.getNavigationEntries).toBe('function')
  })

  it('should return navigation entries', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ModuleRegistryProvider>{children}</ModuleRegistryProvider>
    )

    const { result } = renderHook(() => useModuleRegistry(), { wrapper })

    const entries = result.current.getNavigationEntries()
    expect(Array.isArray(entries)).toBe(true)
  })

  it('should return settings sections', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ModuleRegistryProvider>{children}</ModuleRegistryProvider>
    )

    const { result } = renderHook(() => useModuleRegistry(), { wrapper })

    const sections = result.current.getSettingsSections()
    expect(Array.isArray(sections)).toBe(true)
  })

  it('should return widgets', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ModuleRegistryProvider>{children}</ModuleRegistryProvider>
    )

    const { result } = renderHook(() => useModuleRegistry(), { wrapper })

    const widgets = result.current.getWidgets()
    expect(Array.isArray(widgets)).toBe(true)
  })
})
