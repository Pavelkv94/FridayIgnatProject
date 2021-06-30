import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: "https://neko-back.herokuapp.com/2.0"
    //baseURL: "http://localhost:7542/2.0"
})

//api


export const authApi = {

    me() {
        return instance.post<ResponseLoginType>("/auth/me", {})
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<ResponseLoginType>("/auth/login", {email, password, rememberMe})
    },
    logout() {
        return instance.delete("/auth/me")
    },
    register(email: string, password: string) {
        return instance.post<ResponseRegisterType>("/auth/register", {email, password})
    },
    forgot(email: string, from: string, message: string) {
        return instance.post<ResponseForgotType>("/auth/forgot", {email, from, message})
    },
    newPassword(password: string, resetPasswordToken: string) {
        return instance.post("/auth/set-new-password", {password, resetPasswordToken})
    }
}

//types


export type ResponseLoginType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}

export type ResponseRegisterType = {
    addedUser: any,
    error?: string
}

export type ResponseForgotType = {
    answer: boolean,
    html: boolean,
    info: string,
    success: boolean,
    error?: string
}
