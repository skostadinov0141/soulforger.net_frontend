
export interface Account{
    email: string,
    password: string,
    eula: boolean
}

export interface RegistrationError{
    category: string,
    detail: string
}