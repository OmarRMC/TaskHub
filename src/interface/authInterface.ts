export interface user{
    name:string , 
    email:string, 
}

export interface userAuthInterface {
    user:user 
    token: string 
}