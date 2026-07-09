import { ref } from 'vue'

// Types
export interface LoginCredentials {
  email: string
  password: string
  rememberMe: boolean
}

export interface ValidationErrors {
  email?: string
  password?: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationErrors
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

export interface AuthSuccess {
  success: true
  user: User
  token: string
}

export interface AuthFailure {
  success: false
  error: string
}

export type AuthResult = AuthSuccess | AuthFailure

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Validate form inputs
export function validateForm(credentials: LoginCredentials): ValidationResult {
  const errors: ValidationErrors = {}

  // Email validation
  if (!credentials.email || credentials.email.trim() === '') {
    errors.email = '邮箱不能为空'
  } else if (!emailRegex.test(credentials.email)) {
    errors.email = '邮箱格式不正确'
  }

  // Password validation
  if (!credentials.password || credentials.password.trim() === '') {
    errors.password = '密码不能为空'
  } else if (credentials.password.length < 6) {
    errors.password = '密码至少需要6个字符'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Simulated login function with 3 second delay
export async function login(credentials: LoginCredentials): Promise<AuthResult> {
  // Validate first
  const validation = validateForm(credentials)
  if (!validation.isValid) {
    return {
      success: false,
      error: Object.values(validation.errors)[0]
    }
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 3000))

  // Simulate login - accept any valid credentials
  // In a real app, this would call an API
  if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
    return {
      success: true,
      user: {
        id: '1',
        email: credentials.email,
        name: 'Test User',
        avatar: undefined
      },
      token: 'mock-token-12345'
    }
  }

  // For demo purposes, accept any valid credentials
  if (validation.isValid) {
    return {
      success: true,
      user: {
        id: '1',
        email: credentials.email,
        name: credentials.email.split('@')[0],
        avatar: undefined
      },
      token: 'mock-token-' + Date.now()
    }
  }

  return {
    success: false,
    error: '用户名或密码错误'
  }
}

// Composable for auth state
export function useAuth() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const user = ref<User | null>(null)

  const handleLogin = async (credentials: LoginCredentials): Promise<AuthResult> => {
    isLoading.value = true
    error.value = null

    try {
      const result = await login(credentials)
      
      if (result.success) {
        user.value = result.user
        
        // Handle remember me
        if (credentials.rememberMe) {
          localStorage.setItem('auth_token', result.token)
        } else {
          sessionStorage.setItem('auth_token', result.token)
        }
      } else {
        error.value = result.error
      }
      
      return result
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : '网络错误，请稍后重试'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('auth_token')
    sessionStorage.removeItem('auth_token')
  }

  return {
    isLoading,
    error,
    user,
    login: handleLogin,
    logout,
    validateForm
  }
}