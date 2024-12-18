export interface user {
    name: string,
    email: string,
}

export interface userAuthInterface {
    user: user
    token: string
}
export interface userRegisterInterface extends user {
    password: string,
    password_confirmation: string,
}