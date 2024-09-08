export interface ICreateUser {
    name: string;
    phone: string;
    email: string;
    password: string;
    is_admin: boolean;
}
export interface ILoginUser{
    name: string;
    password: string;
}