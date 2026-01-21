import type { AuthProvider } from './auth-provider.js'
import type { UserProfileProvider } from './user-profile-provider.js'
import type { ModuleVariablesProvider } from './module-variables-provider.js'
import { MockAuthProvider } from './auth-provider.js'
import { MockUserProfileProvider } from './user-profile-provider.js'
import { MockModuleVariablesProvider } from './module-variables-provider.js'

export type ProviderConfig = {
  authProvider?: AuthProvider
  userProfileProvider?: UserProfileProvider
  moduleVariablesProviderFactory?: (moduleId: string) => ModuleVariablesProvider
}

export class ProviderRegistry {
  private authProvider: AuthProvider
  private userProfileProvider: UserProfileProvider
  private moduleVariablesProviderFactory: (moduleId: string) => ModuleVariablesProvider

  constructor(config?: ProviderConfig) {
    this.authProvider = config?.authProvider ?? new MockAuthProvider()
    this.userProfileProvider = config?.userProfileProvider ?? new MockUserProfileProvider()
    this.moduleVariablesProviderFactory =
      config?.moduleVariablesProviderFactory ??
      ((moduleId: string) => new MockModuleVariablesProvider(moduleId))
  }

  getAuthProvider(): AuthProvider {
    return this.authProvider
  }

  getUserProfileProvider(): UserProfileProvider {
    return this.userProfileProvider
  }

  getModuleVariablesProvider(moduleId: string): ModuleVariablesProvider {
    return this.moduleVariablesProviderFactory(moduleId)
  }
}
