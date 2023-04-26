
export interface Account{
    email: string,
    password: string,
    eula: boolean
}

export interface RegistrationError{
    category: string,
    detail: string
}

export interface User{
    display_name: string,
    expires_at: Date
}