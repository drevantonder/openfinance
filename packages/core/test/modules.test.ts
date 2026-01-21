import { describe, it, expect, beforeEach } from 'vitest'
import {
  BaseModuleRegistry,
  type ModuleDefinition,
  type InstanceConfig,
} from '../src/modules.js'
import {
  MockModuleVariablesProvider,
  resetMockModuleVariables,
  type CrossModuleAllowlist,
} from '../src/providers/module-variables-provider.js'

describe('ModuleDefinition', () => {
  it('should define module structure', () => {
    const module: ModuleDefinition = {
      id: 'test-module',
      label: 'Test Module',
      navigation: [
        {
          id: 'nav-1',
          label: 'Navigation Item',
          path: '/test',
        },
      ],
      settings: [
        {
          id: 'settings-1',
          label: 'Settings Section',
          description: 'Test settings',
        },
      ],
      widgets: [
        {
          id: 'widget-1',
          label: 'Widget',
          type: 'chart',
        },
      ],
    }

    expect(module.id).toBe('test-module')
    expect(module.label).toBe('Test Module')
    expect(module.navigation).toHaveLength(1)
    expect(module.settings).toHaveLength(1)
    expect(module.widgets).toHaveLength(1)
  })
})

describe('BaseModuleRegistry', () => {
  it('should register module', () => {
    const registry = new BaseModuleRegistry()
    const module: ModuleDefinition = {
      id: 'test-module',
      label: 'Test Module',
      navigation: [],
      settings: [],
      widgets: [],
    }

    registry.register(module)

    expect(registry.has('test-module')).toBe(true)
  })

  it('should retrieve registered module', () => {
    const registry = new BaseModuleRegistry()
    const module: ModuleDefinition = {
      id: 'test-module',
      label: 'Test Module',
      navigation: [],
      settings: [],
      widgets: [],
    }

    registry.register(module)
    const retrieved = registry.get('test-module')

    expect(retrieved).toEqual(module)
  })

  it('should return undefined for non-existent module', () => {
    const registry = new BaseModuleRegistry()

    const retrieved = registry.get('non-existent')

    expect(retrieved).toBeUndefined()
  })

  it('should list all modules', () => {
    const registry = new BaseModuleRegistry()
    const module1: ModuleDefinition = {
      id: 'module-1',
      label: 'Module 1',
      navigation: [],
      settings: [],
      widgets: [],
    }
    const module2: ModuleDefinition = {
      id: 'module-2',
      label: 'Module 2',
      navigation: [],
      settings: [],
      widgets: [],
    }

    registry.register(module1)
    registry.register(module2)

    const all = registry.getAll()

    expect(all).toHaveLength(2)
    expect(all).toContainEqual(module1)
    expect(all).toContainEqual(module2)
  })

  it('should check if module exists', () => {
    const registry = new BaseModuleRegistry()
    const module: ModuleDefinition = {
      id: 'test-module',
      label: 'Test Module',
      navigation: [],
      settings: [],
      widgets: [],
    }

    expect(registry.has('test-module')).toBe(false)

    registry.register(module)

    expect(registry.has('test-module')).toBe(true)
    expect(registry.has('other-module')).toBe(false)
  })

  it('should unregister module', () => {
    const registry = new BaseModuleRegistry()
    const module: ModuleDefinition = {
      id: 'test-module',
      label: 'Test Module',
      navigation: [],
      settings: [],
      widgets: [],
    }

    registry.register(module)
    expect(registry.has('test-module')).toBe(true)

    registry.unregister('test-module')
    expect(registry.has('test-module')).toBe(false)
    expect(registry.get('test-module')).toBeUndefined()
  })

  it('should replace module when registering with same id', () => {
    const registry = new BaseModuleRegistry()
    const module1: ModuleDefinition = {
      id: 'test-module',
      label: 'Module 1',
      navigation: [],
      settings: [],
      widgets: [],
    }
    const module2: ModuleDefinition = {
      id: 'test-module',
      label: 'Module 2',
      navigation: [],
      settings: [],
      widgets: [],
    }

    registry.register(module1)
    registry.register(module2)

    const retrieved = registry.get('test-module')
    expect(retrieved?.label).toBe('Module 2')
    expect(registry.getAll()).toHaveLength(1)
  })

  it('should return navigation entries from all modules', () => {
    const registry = new BaseModuleRegistry()
    const module1: ModuleDefinition = {
      id: 'module-1',
      label: 'Module 1',
      navigation: [
        { id: 'nav-1', label: 'Nav 1', path: '/one' },
        { id: 'nav-2', label: 'Nav 2', path: '/two' },
      ],
      settings: [],
      widgets: [],
    }
    const module2: ModuleDefinition = {
      id: 'module-2',
      label: 'Module 2',
      navigation: [
        { id: 'nav-3', label: 'Nav 3', path: '/three' },
      ],
      settings: [],
      widgets: [],
    }

    registry.register(module1)
    registry.register(module2)

    const entries = registry.getNavigationEntries()

    expect(entries).toHaveLength(3)
    expect(entries).toContainEqual({ id: 'nav-1', label: 'Nav 1', path: '/one' })
    expect(entries).toContainEqual({ id: 'nav-2', label: 'Nav 2', path: '/two' })
    expect(entries).toContainEqual({ id: 'nav-3', label: 'Nav 3', path: '/three' })
  })

  it('should return empty navigation entries when no modules registered', () => {
    const registry = new BaseModuleRegistry()

    const entries = registry.getNavigationEntries()

    expect(entries).toHaveLength(0)
  })

  it('should return settings sections from all modules', () => {
    const registry = new BaseModuleRegistry()
    const module1: ModuleDefinition = {
      id: 'module-1',
      label: 'Module 1',
      navigation: [],
      settings: [
        { id: 'settings-1', label: 'Settings 1' },
        { id: 'settings-2', label: 'Settings 2' },
      ],
      widgets: [],
    }
    const module2: ModuleDefinition = {
      id: 'module-2',
      label: 'Module 2',
      navigation: [],
      settings: [{ id: 'settings-3', label: 'Settings 3' }],
      widgets: [],
    }

    registry.register(module1)
    registry.register(module2)

    const sections = registry.getSettingsSections()

    expect(sections).toHaveLength(3)
    expect(sections).toContainEqual({ id: 'settings-1', label: 'Settings 1' })
    expect(sections).toContainEqual({ id: 'settings-2', label: 'Settings 2' })
    expect(sections).toContainEqual({ id: 'settings-3', label: 'Settings 3' })
  })

  it('should return empty settings sections when no modules registered', () => {
    const registry = new BaseModuleRegistry()

    const sections = registry.getSettingsSections()

    expect(sections).toHaveLength(0)
  })

  it('should return widgets from all modules', () => {
    const registry = new BaseModuleRegistry()
    const module1: ModuleDefinition = {
      id: 'module-1',
      label: 'Module 1',
      navigation: [],
      settings: [],
      widgets: [
        { id: 'widget-1', label: 'Widget 1', type: 'chart' },
        { id: 'widget-2', label: 'Widget 2', type: 'table' },
      ],
    }
    const module2: ModuleDefinition = {
      id: 'module-2',
      label: 'Module 2',
      navigation: [],
      settings: [],
      widgets: [{ id: 'widget-3', label: 'Widget 3', type: 'card' }],
    }

    registry.register(module1)
    registry.register(module2)

    const widgets = registry.getWidgets()

    expect(widgets).toHaveLength(3)
    expect(widgets).toContainEqual({ id: 'widget-1', label: 'Widget 1', type: 'chart' })
    expect(widgets).toContainEqual({ id: 'widget-2', label: 'Widget 2', type: 'table' })
    expect(widgets).toContainEqual({ id: 'widget-3', label: 'Widget 3', type: 'card' })
  })

  it('should return empty widgets when no modules registered', () => {
    const registry = new BaseModuleRegistry()

    const widgets = registry.getWidgets()

    expect(widgets).toHaveLength(0)
  })

  describe('BaseModuleRegistry.fromConfig', () => {
    const module1: ModuleDefinition = {
      id: 'module-1',
      label: 'Module 1',
      navigation: [],
      settings: [],
      widgets: [],
    }
    const module2: ModuleDefinition = {
      id: 'module-2',
      label: 'Module 2',
      navigation: [],
      settings: [],
      widgets: [],
    }
    const module3: ModuleDefinition = {
      id: 'module-3',
      label: 'Module 3',
      navigation: [],
      settings: [],
      widgets: [],
    }

    it('should load all enabled modules', () => {
      const config: InstanceConfig = {
        enabledModules: ['module-1', 'module-2'],
      }

      const registry = BaseModuleRegistry.fromConfig(config, [
        module1,
        module2,
        module3,
      ])

      expect(registry.getAll()).toHaveLength(2)
      expect(registry.has('module-1')).toBe(true)
      expect(registry.has('module-2')).toBe(true)
      expect(registry.has('module-3')).toBe(false)
    })

    it('should load no modules when none are enabled', () => {
      const config: InstanceConfig = {
        enabledModules: [],
      }

      const registry = BaseModuleRegistry.fromConfig(config, [
        module1,
        module2,
        module3,
      ])

      expect(registry.getAll()).toHaveLength(0)
    })

    it('should skip disabled modules', () => {
      const config: InstanceConfig = {
        enabledModules: ['module-2'],
      }

      const registry = BaseModuleRegistry.fromConfig(config, [
        module1,
        module2,
        module3,
      ])

      expect(registry.has('module-1')).toBe(false)
      expect(registry.has('module-2')).toBe(true)
      expect(registry.has('module-3')).toBe(false)
    })

    it('should ignore unknown enabled module ids', () => {
      const config: InstanceConfig = {
        enabledModules: ['module-1', 'unknown-module'],
      }

      const registry = BaseModuleRegistry.fromConfig(config, [
        module1,
        module2,
      ])

      expect(registry.getAll()).toHaveLength(1)
      expect(registry.has('module-1')).toBe(true)
      expect(registry.has('unknown-module')).toBe(false)
    })
  })
})

describe('MockModuleVariablesProvider', () => {
  beforeEach(() => {
    resetMockModuleVariables()
  })

  it('should store and retrieve values', async () => {
    const provider = new MockModuleVariablesProvider('module-a')
    await provider.set('test-key', 'test-value')
    const result = await provider.get<string>('test-key')
    expect(result).toBe('test-value')
  })

  it('should return null for non-existent keys', async () => {
    const provider = new MockModuleVariablesProvider('module-a')
    const result = await provider.get<string>('non-existent')
    expect(result).toBeNull()
  })

  it('should return null for deleted keys', async () => {
    const provider = new MockModuleVariablesProvider('module-a')
    await provider.set('test-key', 'test-value')
    await provider.delete('test-key')
    const result = await provider.get<string>('test-key')
    expect(result).toBeNull()
  })

  it('should list all keys', async () => {
    const provider = new MockModuleVariablesProvider('module-a')
    await provider.set('key1', 'value1')
    await provider.set('key2', 'value2')
    await provider.set('key3', 'value3')
    const keys = await provider.listKeys()
    expect(keys).toHaveLength(3)
    expect(keys).toContain('key1')
    expect(keys).toContain('key2')
    expect(keys).toContain('key3')
  })

  it('should return empty array for module with no keys', async () => {
    const provider = new MockModuleVariablesProvider('module-a')
    const keys = await provider.listKeys()
    expect(keys).toHaveLength(0)
  })

  it('should persist latest value on update', async () => {
    const provider = new MockModuleVariablesProvider('module-a')
    await provider.set('test-key', 'value1')
    await provider.set('test-key', 'value2')
    const result = await provider.get<string>('test-key')
    expect(result).toBe('value2')
  })

  it('should support different value types', async () => {
    const provider = new MockModuleVariablesProvider('module-a')
    await provider.set('string-key', 'string-value')
    await provider.set('number-key', 42)
    await provider.set('boolean-key', true)
    await provider.set('object-key', { nested: 'value' })
    await provider.set('array-key', [1, 2, 3])

    expect(await provider.get<string>('string-key')).toBe('string-value')
    expect(await provider.get<number>('number-key')).toBe(42)
    expect(await provider.get<boolean>('boolean-key')).toBe(true)
    expect(await provider.get<{ nested: string }>('object-key')).toEqual({
      nested: 'value',
    })
    expect(await provider.get<number[]>('array-key')).toEqual([1, 2, 3])
  })
})

describe('MockModuleVariablesProvider cross-module reads', () => {
  beforeEach(() => {
    resetMockModuleVariables()
  })

  it('should return null when allowlist does not allow cross-module read', async () => {
    const allowlist: CrossModuleAllowlist = {
      'reader-module': {},
    }
    const provider = new MockModuleVariablesProvider('reader-module', allowlist)
    const result = await provider.getFromModule<string>(
      'source-module',
      'allowed-key',
    )
    expect(result).toBeNull()
  })

  it('should return null when key not in allowlist', async () => {
    const allowlist: CrossModuleAllowlist = {
      'reader-module': {
        'source-module': ['allowed-key'],
      },
    }
    const provider = new MockModuleVariablesProvider('reader-module', allowlist)
    const result = await provider.getFromModule<string>(
      'source-module',
      'not-allowed-key',
    )
    expect(result).toBeNull()
  })

  it('should return value when key is in allowlist', async () => {
    const allowlist: CrossModuleAllowlist = {
      'reader-module': {
        'source-module': ['allowed-key'],
      },
    }
    const providerA = new MockModuleVariablesProvider('reader-module', allowlist)
    const providerB = new MockModuleVariablesProvider('source-module')
    await providerB.set('allowed-key', 'shared-value')
    const result = await providerA.getFromModule<string>(
      'source-module',
      'allowed-key',
    )
    expect(result).toBe('shared-value')
  })

  it('should return null when source module has no value', async () => {
    const allowlist: CrossModuleAllowlist = {
      'reader-module': {
        'source-module': ['allowed-key'],
      },
    }
    const provider = new MockModuleVariablesProvider('reader-module', allowlist)
    const result = await provider.getFromModule<string>(
      'source-module',
      'allowed-key',
    )
    expect(result).toBeNull()
  })

  it('should return latest value from source module', async () => {
    const allowlist: CrossModuleAllowlist = {
      'reader-module': {
        'source-module': ['allowed-key'],
      },
    }
    const providerA = new MockModuleVariablesProvider('reader-module', allowlist)
    const providerB = new MockModuleVariablesProvider('source-module')
    await providerB.set('allowed-key', 'initial-value')
    await providerB.set('allowed-key', 'updated-value')
    const result = await providerA.getFromModule<string>(
      'source-module',
      'allowed-key',
    )
    expect(result).toBe('updated-value')
  })

  it('should support multiple readers with different allowlists', async () => {
    const allowlist: CrossModuleAllowlist = {
      'reader-a': {
        'source-module': ['key1'],
      },
      'reader-b': {
        'source-module': ['key2'],
      },
    }
    const providerA = new MockModuleVariablesProvider('reader-a', allowlist)
    const providerB = new MockModuleVariablesProvider('reader-b', allowlist)
    const source = new MockModuleVariablesProvider('source-module')
    await source.set('key1', 'value1')
    await source.set('key2', 'value2')

    const resultA = await providerA.getFromModule<string>(
      'source-module',
      'key1',
    )
    const resultB = await providerB.getFromModule<string>(
      'source-module',
      'key2',
    )

    expect(resultA).toBe('value1')
    expect(resultB).toBe('value2')
  })

  it('should return configured allowlist', async () => {
    const allowlist: CrossModuleAllowlist = {
      'reader-module': {
        'source-module': ['key1', 'key2'],
      },
    }
    const provider = new MockModuleVariablesProvider('reader-module', allowlist)
    const result = await provider.getCrossModuleAllowlist()
    expect(result).toEqual(allowlist)
  })

  it('should support multiple source modules in allowlist', async () => {
    const allowlist: CrossModuleAllowlist = {
      'reader-module': {
        'source-a': ['key1'],
        'source-b': ['key2'],
      },
    }
    const provider = new MockModuleVariablesProvider('reader-module', allowlist)
    const sourceA = new MockModuleVariablesProvider('source-a')
    const sourceB = new MockModuleVariablesProvider('source-b')
    await sourceA.set('key1', 'value-from-a')
    await sourceB.set('key2', 'value-from-b')

    const resultA = await provider.getFromModule<string>('source-a', 'key1')
    const resultB = await provider.getFromModule<string>('source-b', 'key2')

    expect(resultA).toBe('value-from-a')
    expect(resultB).toBe('value-from-b')
  })
})
