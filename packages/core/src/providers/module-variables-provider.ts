export interface ModuleVariablesProvider {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T): Promise<void>
  delete(key: string): Promise<void>
  listKeys(): Promise<string[]>
}

export interface ModuleVariablesProviderWithCrossModuleRead extends ModuleVariablesProvider {
  getFromModule<T>(module: string, key: string): Promise<T | null>
  getCrossModuleAllowlist(): Promise<CrossModuleAllowlist>
}

export type CrossModuleAllowlist = {
  [readerModule: string]: {
    [sourceModule: string]: string[]
  }
}

const storage = new Map<string, Map<string, unknown>>()

let allowlist: CrossModuleAllowlist = {}

export class MockModuleVariablesProvider
  implements ModuleVariablesProviderWithCrossModuleRead
{
  private moduleId: string

  constructor(moduleId: string, initialAllowlist?: CrossModuleAllowlist) {
    this.moduleId = moduleId
    if (!storage.has(moduleId)) {
      storage.set(moduleId, new Map())
    }
    if (initialAllowlist) {
      allowlist = initialAllowlist
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const moduleStorage = storage.get(this.moduleId)
    if (!moduleStorage) return null
    const value = moduleStorage.get(key)
    return value !== undefined ? (value as T) : null
  }

  async set<T>(key: string, value: T): Promise<void> {
    let moduleStorage = storage.get(this.moduleId)
    if (!moduleStorage) {
      moduleStorage = new Map()
      storage.set(this.moduleId, moduleStorage)
    }
    moduleStorage.set(key, value)
  }

  async delete(key: string): Promise<void> {
    const moduleStorage = storage.get(this.moduleId)
    if (moduleStorage) {
      moduleStorage.delete(key)
    }
  }

  async listKeys(): Promise<string[]> {
    const moduleStorage = storage.get(this.moduleId)
    if (!moduleStorage) return []
    return Array.from(moduleStorage.keys())
  }

  async getFromModule<T>(
    sourceModule: string,
    key: string,
  ): Promise<T | null> {
    if (!this._isAllowed(this.moduleId, sourceModule, key)) {
      return null
    }
    const sourceStorage = storage.get(sourceModule)
    if (!sourceStorage) return null
    const value = sourceStorage.get(key)
    return value !== undefined ? (value as T) : null
  }

  async getCrossModuleAllowlist(): Promise<CrossModuleAllowlist> {
    return allowlist
  }

  private _isAllowed(
    readerModule: string,
    sourceModule: string,
    key: string,
  ): boolean {
    const readerRules = allowlist[readerModule]
    if (!readerRules) return false
    const allowedKeys = readerRules[sourceModule]
    if (!allowedKeys) return false
    return allowedKeys.includes(key)
  }
}

export function resetMockModuleVariables(): void {
  storage.clear()
  allowlist = {}
}
