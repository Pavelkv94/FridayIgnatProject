import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:7542/2.0"
})
//api

export const authApi = {
    
    me() {
        return instance.post<ResponseLoginType>("/auth/me", {})
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<ResponseLoginType>("/auth/login", { email, password, rememberMe })
    },

    logout() {
        return instance.delete("/auth/me")
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

