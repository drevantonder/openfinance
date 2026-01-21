import { describe, it, expect, beforeEach } from 'vitest'
import { MockAuthProvider, type AuthProvider, type Session } from '../src/providers/auth-provider.js'
import { MockUserProfileProvider, type UserProfileProvider, type UserProfile } from '../src/providers/user-profile-provider.js'
import { MockModuleVariablesProvider, resetMockModuleVariables, type ModuleVariablesProvider, type ModuleVariablesProviderWithCrossModuleRead } from '../src/providers/module-variables-provider.js'
import { ProviderRegistry } from '../src/providers/provider-registry.js'

describe('MockAuthProvider', () => {
  let provider: MockAuthProvider

  beforeEach(() => {
    provider = new MockAuthProvider()
  })

  it('should return null session when not signed in', async () => {
    const session = await provider.getSession()
    expect(session).toBeNull()
  })

  it('should sign in and return a session', async () => {
    const session = await provider.signIn()
    expect(session.userId).toBe('mock-user-123')
    expect(session.accessToken).toBe('mock-access-token')
    expect(session.expiresAt).toBeGreaterThan(Date.now())
  })

  it('should return session after sign in', async () => {
    await provider.signIn()
    const session = await provider.getSession()
    expect(session).not.toBeNull()
    expect(session?.userId).toBe('mock-user-123')
  })

  it('should clear session on sign out', async () => {
    await provider.signIn()
    await provider.signOut()
    const session = await provider.getSession()
    expect(session).toBeNull()
  })
})

describe('MockUserProfileProvider', () => {
  let provider: MockUserProfileProvider

  beforeEach(() => {
    provider = new MockUserProfileProvider()
  })

  it('should return null profile when not set', async () => {
    const profile = await provider.getProfile()
    expect(profile).toBeNull()
  })

  it('should save and return profile with email', async () => {
    const profile = await provider.updateProfile({ email: 'test@example.com' })
    expect(profile.email).toBe('test@example.com')
    expect(profile.id).toBe('mock-user-123')
  })

  it('should save and return profile with name', async () => {
    const profile = await provider.updateProfile({ name: 'Test User' })
    expect(profile.name).toBe('Test User')
  })

  it('should save and return profile with picture', async () => {
    const profile = await provider.updateProfile({ picture: 'https://example.com/avatar.jpg' })
    expect(profile.picture).toBe('https://example.com/avatar.jpg')
  })

  it('should return the latest stored profile', async () => {
    await provider.updateProfile({ email: 'first@example.com', name: 'First Name' })
    const profile1 = await provider.getProfile()
    expect(profile1?.email).toBe('first@example.com')
    expect(profile1?.name).toBe('First Name')

    await provider.updateProfile({ name: 'Updated Name' })
    const profile2 = await provider.getProfile()
    expect(profile2?.email).toBe('first@example.com')
    expect(profile2?.name).toBe('Updated Name')
  })

  it('should update existing profile', async () => {
    await provider.updateProfile({ email: 'test@example.com', name: 'Test User' })
    const updated = await provider.updateProfile({ picture: 'https://example.com/avatar.jpg' })
    expect(updated.email).toBe('test@example.com')
    expect(updated.name).toBe('Test User')
    expect(updated.picture).toBe('https://example.com/avatar.jpg')
  })
})

describe('UserProfileProvider', () => {
  it('should read user profile', async () => {
    const provider: UserProfileProvider = {
      async getProfile(): Promise<UserProfile | null> {
        return {
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
          picture: 'https://example.com/avatar.jpg',
        }
      },
      async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
        return {
          id: '1',
          email: 'test@example.com',
          name: updates.name || 'Test User',
          picture: updates.picture || 'https://example.com/avatar.jpg',
        }
      },
    }

    const profile = await provider.getProfile()
    expect(profile).not.toBeNull()
    expect(profile?.email).toBe('test@example.com')
  })

  it('should write user profile', async () => {
    const provider: UserProfileProvider = {
      async getProfile(): Promise<UserProfile | null> {
        return {
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
        }
      },
      async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
        return {
          id: '1',
          email: 'test@example.com',
          name: updates.name || 'Test User',
          picture: updates.picture || 'https://example.com/avatar.jpg',
        }
      },
    }

    const updated = await provider.updateProfile({ name: 'Updated Name' })
    expect(updated.name).toBe('Updated Name')
  })
})

describe('ModuleVariablesProvider', () => {
  it('should support get/set operations', async () => {
    const provider: ModuleVariablesProvider = {
      async get<T>(key: string): Promise<T | null> {
        return null as T
      },
      async set<T>(key: string, value: T): Promise<void> {},
      async delete(key: string): Promise<void> {},
      async listKeys(): Promise<string[]> {
        return []
      },
    }

    await expect(provider.set('test-key', 'value')).resolves.not.toThrow()
    const value = await provider.get<string>('test-key')
    expect(value).toBeNull()
  })

  it('should support allowlisted cross-module reads', async () => {
    const provider: ModuleVariablesProviderWithCrossModuleRead = {
      async get<T>(key: string): Promise<T | null> {
        return null as T
      },
      async set<T>(key: string, value: T): Promise<void> {},
      async delete(key: string): Promise<void> {},
      async listKeys(): Promise<string[]> {
        return []
      },
      async getFromModule<T>(module: string, key: string): Promise<T | null> {
        return null as T
      },
      async getCrossModuleAllowlist() {
        return {
          'budget-module': {
            'expenses-module': ['limit'],
          },
        }
      },
    }

    const allowlist = await provider.getCrossModuleAllowlist()
    expect(allowlist['budget-module']['expenses-module']).toContain('limit')
  })
})

describe('ProviderRegistry', () => {
  it('should use mock providers by default', async () => {
    const registry = new ProviderRegistry()
    const authProvider = registry.getAuthProvider()
    const userProfileProvider = registry.getUserProfileProvider()

    const session = await authProvider.signIn({ email: 'test@example.com', password: 'password' })
    expect(session.userId).toBe('mock-user-123')

    const profile = await userProfileProvider.updateProfile({ email: 'test@example.com' })
    expect(profile.email).toBe('test@example.com')
  })

  it('should use custom auth provider when provided', async () => {
    const customAuthProvider: AuthProvider = {
      async getSession(): Promise<Session | null> {
        return { userId: 'custom-123', accessToken: 'custom-token', expiresAt: Date.now() + 1000 }
      },
      async signIn(): Promise<Session> {
        return { userId: 'custom-123', accessToken: 'custom-token', expiresAt: Date.now() + 1000 }
      },
      async signOut(): Promise<void> {},
    }

    const registry = new ProviderRegistry({ authProvider: customAuthProvider })
    const session = await registry.getAuthProvider().signIn({ email: 'test@example.com', password: 'password' })
    expect(session.userId).toBe('custom-123')
  })

  it('should use custom user profile provider when provided', async () => {
    const customUserProfileProvider: UserProfileProvider = {
      async getProfile(): Promise<UserProfile | null> {
        return { id: 'custom-123', email: 'custom@example.com' }
      },
      async updateProfile(): Promise<UserProfile> {
        return { id: 'custom-123', email: 'custom@example.com' }
      },
    }

    const registry = new ProviderRegistry({ userProfileProvider: customUserProfileProvider })
    const profile = await registry.getUserProfileProvider().getProfile()
    expect(profile?.email).toBe('custom@example.com')
  })

  it('should use custom module variables provider factory when provided', async () => {
    const customModuleVariablesProviderFactory = (moduleId: string) =>
      new MockModuleVariablesProvider(moduleId, { 'test-module': { 'source-module': ['key1'] } })

    const registry = new ProviderRegistry({ moduleVariablesProviderFactory: customModuleVariablesProviderFactory })
    const provider = registry.getModuleVariablesProvider('test-module')

    await provider.set('key1', 'value1')
    const value = await provider.get('key1')
    expect(value).toBe('value1')
  })

  it('should create separate module variables providers for different module IDs', async () => {
    const registry = new ProviderRegistry()
    const provider1 = registry.getModuleVariablesProvider('module-1')
    const provider2 = registry.getModuleVariablesProvider('module-2')

    await provider1.set('key', 'value1')
    await provider2.set('key', 'value2')

    const value1 = await provider1.get('key')
    const value2 = await provider2.get('key')

    expect(value1).toBe('value1')
    expect(value2).toBe('value2')
  })
})
