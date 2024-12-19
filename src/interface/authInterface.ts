export interface userInterface {
    name: string,
    email: string,
}

export interface userAuthInterface {
    user: userInterface
    token: string
}
export interface userRegisterInterface extends userInterface {
    password: string,
    password_confirmation: string,
}