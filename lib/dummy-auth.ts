// Dummy authentication system for development
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'teacher' | 'student'
}

// Dummy users for testing
const DUMMY_USERS: User[] = [
  {
    id: '1',
    email: 'admin@jejakbelajar.id',
    name: 'Admin Sekolah',
    role: 'admin'
  },
  {
    id: '2',
    email: 'guru@jejakbelajar.id',
    name: 'Bu Sari Wijaya',
    role: 'teacher'
  },
  {
    id: '3',
    email: 'siswa@jejakbelajar.id',
    name: 'Andi Pratama',
    role: 'student'
  }
]

const DUMMY_PASSWORDS = {
  'admin@jejakbelajar.id': 'admin123',
  'guru@jejakbelajar.id': 'guru123',
  'siswa@jejakbelajar.id': 'siswa123'
}

export class DummyAuth {
  private static currentUser: User | null = null

  static async signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const user = DUMMY_USERS.find(u => u.email === email)
    const expectedPassword = DUMMY_PASSWORDS[email as keyof typeof DUMMY_PASSWORDS]

    if (!user || password !== expectedPassword) {
      return { user: null, error: 'Email atau password salah' }
    }

    this.currentUser = user
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('dummy_auth_user', JSON.stringify(user))
    }

    return { user, error: null }
  }

  static async signOut(): Promise<void> {
    this.currentUser = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dummy_auth_user')
    }
  }

  static getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser
    }

    // Try to get from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('dummy_auth_user')
      if (stored) {
        try {
          this.currentUser = JSON.parse(stored)
          return this.currentUser
        } catch {
          localStorage.removeItem('dummy_auth_user')
        }
      }
    }

    return null
  }

  static async getUser(): Promise<User | null> {
    return this.getCurrentUser()
  }
}