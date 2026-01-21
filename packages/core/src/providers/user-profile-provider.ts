export interface UserProfileProvider {
  getProfile(): Promise<UserProfile | null>
  updateProfile(updates: Partial<UserProfile>): Promise<UserProfile>
}

export type UserProfile = {
  id: string
  email: string
  name?: string
  picture?: string
}

const MOCK_USER_ID = 'mock-user-123'

let currentProfile: UserProfile | null = null

export class MockUserProfileProvider implements UserProfileProvider {
  async getProfile(): Promise<UserProfile | null> {
    return currentProfile
  }

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    if (currentProfile === null) {
      currentProfile = {
        id: MOCK_USER_ID,
        email: '',
        ...updates,
      }
    } else {
      currentProfile = {
        ...currentProfile,
        ...updates,
      }
    }
    return currentProfile
  }
}
