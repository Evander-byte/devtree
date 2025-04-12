export interface ErrorMessageProps {
    children: React.ReactNode
}

export interface User {
    handle: string
    name: string
    email: string
    description: string
}

export type RegisterCredentials = Pick<User, 'handle' | 'email' | 'name'> & {
    password: string
    password_confirmation: string
}

export type LoginCredencials = Pick<User, 'email'> & {
    password: ''
}

export interface DevTreeProps {
    data: User
}

export type ProfileForm = Pick<User, 'handle' | 'description'>