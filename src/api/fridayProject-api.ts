import axios from "axios";

//api

export const authApi = {
    register(email:string, password: string) {
        const promise = axios.post<ResponseRegisterType>("http://localhost:7542/2.0/auth/register", {email, password})
        return promise
    }
}

//types

export type ParamsRegisterType = {
    email: string,
    password: string
}

export type ResponseRegisterType = {
    addedUser: any,
    error?: string
}