export interface IAuth {
    email: string;
    password: string
}

export interface IUser {
    email: string;
    _id: string;
}
export interface ILoginResponse {
    user: IUser,
    token: string
}