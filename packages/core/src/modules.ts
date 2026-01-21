export type NavigationEntry = {
  id: string
  label: string
  path: string
}

import type { ComponentType } from 'react'

export type SettingsSection = {
  id: string
  label: string
  description?: string
  icon?: string
  slug?: string
  component?: ComponentType
}

export type Widget = {
  id: string
  label: string
  type: string
}

export type ModuleDefinition = {
  id: string
  label: string
  navigation: NavigationEntry[]
  settings: SettingsSection[]
  widgets: Widget[]
}

export type InstanceConfig = {
  enabledModules: string[]
}

export interface ModuleRegistry {
  register(module: ModuleDefinition): void
  get(id: string): ModuleDefinition | undefined
  getAll(): ModuleDefinition[]
  has(id: string): boolean
  unregister(id: string): void
  getNavigationEntries(): NavigationEntry[]
  getSettingsSections(): SettingsSection[]
  getWidgets(): Widget[]
}

export class BaseModuleRegistry implements ModuleRegistry {
  private modules: Map<string, ModuleDefinition>

  constructor() {
    this.modules = new Map()
  }

  static fromConfig(
    config: InstanceConfig,
    availableModules: ModuleDefinition[],
  ): BaseModuleRegistry {
    const registry = new BaseModuleRegistry()
    for (const module of availableModules) {
      if (config.enabledModules.includes(module.id)) {
        registry.register(module)
      }
    }
    return registry
  }

  register(module: ModuleDefinition): void {
    this.modules.set(module.id, module)
  }

  get(id: string): ModuleDefinition | undefined {
    return this.modules.get(id)
  }

  getAll(): ModuleDefinition[] {
    return Array.from(this.modules.values())
  }

  has(id: string): boolean {
    return this.modules.has(id)
  }

  unregister(id: string): void {
    this.modules.delete(id)
  }

  getNavigationEntries(): NavigationEntry[] {
    return this.getAll().flatMap((module) => module.navigation)
  }

  getSettingsSections(): SettingsSection[] {
    return this.getAll().flatMap((module) => module.settings)
  }

  getWidgets(): Widget[] {
    return this.getAll().flatMap((module) => module.widgets)
  }
}
