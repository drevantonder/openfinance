export type Session = {
  userId: string
  accessToken: string
  expiresAt: number
}

export interface AuthProvider {
  getSession(): Promise<Session | null>
  signIn(credentials: SignInCredentials): Promise<Session>
  signOut(): Promise<void>
}

export type SignInCredentials = {
  email: string
  password: string
}

const MOCK_USER_ID = 'mock-user-123'
const MOCK_ACCESS_TOKEN = 'mock-access-token'
const MOCK_SESSION_DURATION = 3600000

let currentSession: Session | null = null

export class MockAuthProvider implements AuthProvider {
  async getSession(): Promise<Session | null> {
    return currentSession
  }

  async signIn(): Promise<Session> {
    const session: Session = {
      userId: MOCK_USER_ID,
      accessToken: MOCK_ACCESS_TOKEN,
      expiresAt: Date.now() + MOCK_SESSION_DURATION,
    }
    currentSession = session
    return session
  }

  async signOut(): Promise<void> {
    currentSession = null
  }
}
