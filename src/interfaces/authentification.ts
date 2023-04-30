
export interface Account{
    email: string,
    display_name: string,
    password: string,
    password_confirmation: string,
    eula: boolean
}

export interface Login{
    email: string,
    password: string,
    keep_logged_in: boolean
}

export interface RegistrationError{
    category: string,
    detail: string
}

export interface User{
    display_name: string,
    expires_at: Date
}